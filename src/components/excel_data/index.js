import React, { Component } from "react";
import {ExcelRenderer} from 'react-excel-renderer';
import { connect } from "react-redux";
import { ADD_ITEM_TERMS} from "../../constatns/todo_type";
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import './style.css';
import SearchResult from '../search';

class TranslateTerms extends Component {
  state= {
    status: 'You can upload your base here...',
  }
  fileHandler = (event) => {
    let fileObj = event.target.files[0];
    ExcelRenderer(fileObj, (err, resp) => {
      if(err){
        console.log(err);            
      }
      else{
        const base_terms = resp.rows;
        base_terms.forEach(item => {
          this.props.dispatch({
            type: ADD_ITEM_TERMS,
            form: item[0],
            mean: item[1],
            word: item[2],
            translate: item[3],
            example: item[4]
          });
        });
        this.setState({status: "Your base was upload sucessfully!"})
      }
    });                 
 }

  render() {
    const Input = styled('input')({
      display: 'none',
    });
    const ButtonRoot = React.forwardRef(function ButtonRoot(props, ref) {
      const { children, ...other } = props;
      return (
        <svg width="150" height="50" {...other} ref={ref}>
          <polygon points="0,50 0,0 150,0 150,50" className="bg" />
          <polygon points="0,50 0,0 150,0 150,50" className="borderEffect" />
          <foreignObject x="1" y="1" width="150" height="50">
            <div className="content">{children}</div>
          </foreignObject>
        </svg>
      );
    });
    ButtonRoot.propTypes = {
      children: PropTypes.node,
    };
    const CustomButtonRoot = styled(ButtonRoot)(
      ({ theme }) => `
      overflow: visible;
      cursor: pointer;
      --main-color: ${
        theme.palette.mode === 'light' ? '#7b1fa2' : 'rgb(144,202,249)'
      };
      --hover-color: ${
        theme.palette.mode === 'light'
          ? 'rgba(25,118,210,0.04)'
          : 'rgba(144,202,249,0.08)'
      };
      --active-color: ${
        theme.palette.mode === 'light'
          ? 'rgba(25,118,210,0.12)'
          : 'rgba(144,202,249,0.24)'
      };
    
      & polygon {
        fill: transparent;
        transition: all 800ms ease;
        pointer-events: none;
      }
      
      & .bg {
        stroke: var(--main-color);
        stroke-width: 0.8;
        filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.1));
        fill: transparent;
      }
    
      & .borderEffect {
        stroke: var(--main-color);
        stroke-width: 2;
        stroke-dasharray: 150 600;
        stroke-dashoffset: 150;
        fill: transparent;
      }
    
      &:hover,
      &.${buttonUnstyledClasses.focusVisible} {
        .borderEffect {
          stroke-dashoffset: -600;
        }
    
        .bg {
          fill: var(--hover-color);
        }
      }
    
      &:focus,
      &.${buttonUnstyledClasses.focusVisible} {
        outline: none;
      }
    
      &.${buttonUnstyledClasses.active} { 
        & .bg {
          fill: var(--active-color);
          transition: fill 300ms ease-out;
        }
      }
    
      & foreignObject {
        pointer-events: none;
    
        & .content {
          font-family: Helvetica, Inter, Arial, sans-serif;
          font-size: 15px;
          font-weight: bold;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #7b1fa2;
          text-transform: uppercase;
        }
    
        & svg {
          margin: 0 5px;
        }
      }`,
    );
    const SvgButton = React.forwardRef(function SvgButton(props, ref) {
      return <ButtonUnstyled {...props} component={CustomButtonRoot} ref={ref} />;
    });
    return (
      <div className="base_block">
        <h1>Search Terms</h1>
      <label htmlFor="contained-button-file" className="upload">
        <Input id="contained-button-file" multiple type="file" onChange={this.fileHandler.bind(this)}/>
        <SvgButton className="but_load" >Upload terms</SvgButton>
        <h3>{this.state.status}</h3>
      </label>
      <SearchResult/>
      </div>
    );
  }
}
  function mapStateToProps(state) {
    return {
      terms: state.todo,
    };
  }
export default connect(mapStateToProps)(TranslateTerms);
