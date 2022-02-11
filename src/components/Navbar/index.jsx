import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink as Link  } from 'react-router-dom';
import {FaBars} from 'react-icons/fa'
import { Badge} from 'react-bootstrap';
import axios from 'axios';


const Navigation = ( {props, childToParent}) => {
    const [keyword , setKeyword] = useState ('');
    const token = localStorage.getItem('token');
    const config = {
        headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}
      }
    const handleLogOut = () => {
        
        const email = props.user.email;
        const password = props.user.password;
        const body= {email, password}
        
        axios.post('http://localhost:3000/auth/logout' , body , config).then(res => {console.log(res.data); localStorage.clear()})
        setTimeout(()=> window.location.reload() , 2000)
    }
  
   
    let buttons;
    if(token){
        buttons = (
     <NavBtn onClick={handleLogOut}>
      <NavBtnLink to="/login">Log Out</NavBtnLink>
      </NavBtn>
        )
    } else {
        buttons= (
            <NavBtn>
      <NavBtnLink to="/login">Sign In</NavBtnLink>
      </NavBtn>
        )
    }
  return (
    <>
    <Nav id="navbar">
      <Navlink to="/">
          <Image src={require('../../logo512.png')}/>
      </Navlink>
      <Bars/>
      <NavMenu>
            <Input placeholder='Search Here..' onChange={e => setKeyword(e.target.value)}/> 
          <Button onClick={() => childToParent(keyword)}>Search </Button>
          <Navlink to="/about" >
              About
          </Navlink>
          <Navlink to="/profile" >
              Profile
          </Navlink>
          <Navlink to="/cart" >
          <i className="fa fa-fw fa-shopping-cart" style={{marginRight:'8px', fontSize:'20px'}}></i>
          <Badge> 1</Badge>
          </Navlink>
         
          {buttons}
      </NavMenu>
      
    </Nav>
    </>

  );
};

export default Navigation;

const Button = styled.button`
border-radius:4px;
background: #C5C5C5;
padding: 10px 22px;
color: #fff;
border:none;
outline:none;
cursor:pointer;
transition: all 0.2 ease-in-out;
margin-left: 5px;
margin-right:10px;

&:hover{
    transition: all 0.2 ease-in-out;
    background: #fff;
    color: #636363;
}

@media screen and (max-width:768px){
    display:none;
 }

`
const Image = styled.img`
height: 60px;
`

const Input = styled.input`
height: 40px;
width: 200px;
margin-left: 10px;
border-radius: 8px;
padding: 5px;

@media screen and (max-width:768px){
    display:none;
 }
`
const Nav = styled.nav`
  background: #dcdcdc;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.7rem calc((100vw - 1000px) / 2);
  z-index: 10;
  
  
`
const Navlink = styled(Link)`
color: #fff;
display: flex;
align-items: center;
text-decoration:none;
padding:0 1rem;
heigt: 100%;
cursor: pointer;



&.action {
    color: #d6d6d6;
    
}

&:hover{
    color: #636363;
    
}
`

const Bars = styled(FaBars)`
display:none;
color:#fff;

@media screen and (max-width: 768px){
    display: block;
    position:absolute;
    top:0;
    right:0;
    transform: translate(-100%, 75%);
    font-size: 2rem;
    margin-top: 5px;
    cursor: pointer
}
`

const NavMenu = styled.div`
 display:flex;
 align-items:center;
 margin: auto;

 @media screen and (max-width:768px){
    display:none;
 }


`

const NavBtn = styled.nav`
display:flex;
align-items:center;
margin-right:5px;

@media screen and (max-width:768px){
    display:none;
}
`
const NavBtnLink = styled(Link)`
border-radius:4px;
background: #C5C5C5;
padding: 10px 22px;
color: #fff;
border:none;
outline:none;
cursor:pointer;
transition: all 0.2 ease-in-out;
text-decoration: none;

&:hover{
    transition: all 0.2 ease-in-out;
    background: #fff;
    color: #636363;
}
`