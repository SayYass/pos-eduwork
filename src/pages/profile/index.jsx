
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const Profile = (props) => {
  const [nama, setNama] = useState('');
  const [provinsi, setProvinsi] = useState('');
  const [kabupaten, setKabupaten]  = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [kelurahan, setKelurahan]  = useState('');
  const [detail, setDetail]  = useState('');
  const [data, setData] = useState([]);
  const config = {
    headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}
  }
  const index = () => {
    axios.get('http://localhost:3000/api/delivery-addresses' , config ).then(res => setData(res.data.data))
    console.log(data)
  }
  useEffect (() => {
    index();
  }, [])

  const handleSubmit = () => {
    const body = { nama, provinsi, kabupaten, kecamatan, kelurahan, detail};
    axios.post('http://localhost:3000/api/delivery-addresses' , body , config).then(e => console.log(e))
    setTimeout(()=> window.location.reload() , 2000)
  }

  const handleDelete = (_id, e) => {
    e.preventDefault();
    axios.delete(`http://localhost:3000/api/delivery-addresses/${_id}`, config).then(res => console.log(res))
    setTimeout(()=> window.location.reload() , 2000)
  }

  const handleDisplay = (_id , e) => {
    e.preventDefault();
    return (
      <FormWrap>
        <Title>Masukan Alamat</Title>
        <Labels>Jalan :  </Labels>
        <Input placeholder={data.nama}  onChange={e => setNama(e.target.value)}></Input>
        <Labels>Provinsi :  </Labels>
        <Input placeholder={data.provinsi} onChange={e => setProvinsi(e.target.value)}></Input>
        <Labels>Kabupaten/Kota :  </Labels>
        <Input placeholder={data.kabupaten} onChange={e => setKabupaten(e.target.value)}></Input>
        <Labels>Kecamatan :  </Labels>
        <Input placeholder={data.kecamatan} onChange={e => setKecamatan(e.target.value)}></Input>
        <Labels>Kelurahan :  </Labels>
        <Input placeholder={data.kelurahan} onChange={e => setKelurahan(e.target.value)}></Input>
        <Labels>Detail :  </Labels>
        <Input placeholder={data.detail} onChange={e => setDetail(e.target.value)}></Input>
        <Buttons onClick={handleSubmit}>Edit</Buttons>
        <Title>Alamat Anda</Title>
        </FormWrap>
    )
    
  }

  if(props.user.full_name){
    return(
      <div style={{
        display: 'flex',
        
        
    }}>
      <h2 style={{marginLeft: '30px' , marginTop : '30px' }}>Welcome {props.user.full_name}</h2>
      
      <Wrapper>
      
      
        <FormWrap>
        <Title>Masukan Alamat</Title>
        <Labels>Jalan :  </Labels>
        <Input placeholder='Masukan Nama Jalan.'  onChange={e => setNama(e.target.value)}></Input>
        <Labels>Provinsi :  </Labels>
        <Input placeholder='Masukan Provinsi.' onChange={e => setProvinsi(e.target.value)}></Input>
        <Labels>Kabupaten/Kota :  </Labels>
        <Input placeholder='Masukan Kabupaten / Kota.' onChange={e => setKabupaten(e.target.value)}></Input>
        <Labels>Kecamatan :  </Labels>
        <Input placeholder='Masukan Kecamatan.' onChange={e => setKecamatan(e.target.value)}></Input>
        <Labels>Kelurahan :  </Labels>
        <Input placeholder='Masukan Kelurahan.' onChange={e => setKelurahan(e.target.value)}></Input>
        <Labels>Detail :  </Labels>
        <Input placeholder='Masukan Detail.' onChange={e => setDetail(e.target.value)}></Input>
        <Buttons onClick={handleSubmit}>SUBMIT</Buttons>
        <Title>Alamat Anda</Title>
        </FormWrap>
        
       {
         data.map(alamat => 
          <FormWrap>
          
          <Labels>Jalan : {alamat.nama}  </Labels>
          
          <Labels>Provinsi :  {alamat.provinsi}</Labels>
         
          <Labels>Kabupaten/Kota : {alamat.kabupaten} </Labels>
         
          <Labels>Kecamatan :  {alamat.kecamatan}</Labels>
          
          <Labels>Kelurahan :  {alamat.kelurahan}</Labels>
  
          <Labels>Detail : {alamat.detail} </Labels>
          <Buttons onClick={(e) => handleDisplay(alamat._id , e)} >  <i className="fa fa-fw fa-edit" style={{textDecoration: 'none' , color: 'green' }}> </i>  </Buttons>
          <Buttons onClick={(e) => handleDelete(alamat._id , e)} >  <i className="fa fa-fw fa-trash" style={{textDecoration: 'none' , color: 'red' }}> </i>  </Buttons>
          </FormWrap>
          )
       }
        
      </Wrapper>
      </div>
    )
  }
  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh'
    }}>
        <h1 >Please Login to acces this site</h1>
    </div>
  );
};

const Wrapper = styled.div`
display: inline-block;
 align-items:center;
 margin: auto;
 width: 80%;
 padding: 20px;
 box-sizing: border-box;
 justify-content:center;

`

const FormWrap = styled.div`
display: grid;
 align-items:center;
 margin: auto;
 width: 80%;
 box-sizing: border-box;
 box-shadow: black;
 padding: 10px;
 
`
const Title = styled.h3`

display: block;
margin-top: 10px;
margin-bottom: 10px;
`

const Labels =  styled.label`
margin-top: 20px;
`

const Input = styled.input`
padding: 7px 0;
  width: 100%;
  font-family: inherit;
  font-size: 14px;
  border-top: 0;
  border-right: 0;
  border-bottom: 1px solid #ddd;
  border-left: 0;
  transition: border-bottom-color 0.25s ease-in;
  display: block;
  &:focus {
    border-bottom-color: #000;
    outline: 0;
  }
`

const Buttons = styled.button`
border-radius:4px;
background: #C5C5C5;
padding: 10px 22px;
color: #fff;
border:none;
outline:none;
cursor:pointer;


margin-right:10px;
margin-top: 10px;
font-size: 15px;

&:hover{
    
    background: #fff;
    color: #636363;
}
`
export default Profile;
