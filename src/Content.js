/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
function Content(arg){
  let [getMeme,fungsiGetMeme]=React.useState({
    'data':[],
    'opsi-pilih-meme':[]
  });
  let [setMeme,fungsiSetMeme]=React.useState({
    'loading':false,
    'url':'',
    "nomor":0,
    'elemen-input':[]
  });
  function getNextMeme() {
    let nomor=setMeme.nomor+1
    if(nomor>getMeme.data.length-1){
      nomor=0;
    }
    let elin = [];
    for (let x = 0; x < getMeme.data[nomor].box_count; x++) {
      elin.push(<input key={x} class='textbox' type='text' placeholder={"text-" + (x + 1)} id={"text-" + (x + 1)} />)
    }
    fungsiSetMeme({'loading':false, 'url': getMeme.data[nomor].url, 'nomor': nomor, "elemen-input": elin });
  }
  function selectMeme(ev) {
    let nomor = ev.target.value;
    console.log(nomor)
    let elin = [];
    for (let x = 0; x < getMeme.data[nomor].box_count; x++) {
      elin.push(<input key={x} class='textbox' type='text' placeholder={"text-" + (x + 1)} id={"text-" + (x + 1)} />)
    }
    fungsiSetMeme({ 'loading': false, 'url': getMeme.data[nomor].url, 'nomor': nomor, "elemen-input": elin });
  }
  function getPrevMeme() {
    let nomor = setMeme.nomor - 1
    if (nomor < 0) {
      nomor = getMeme.data.length - 1;
    }
    let elin = [];
    for (let x = 0; x < getMeme.data[nomor].box_count; x++) {
      elin.push(<input key={x} class='textbox' type='text' placeholder={"text-" + (x + 1)} id={"text-" + (x + 1)} />)
    }
    fungsiSetMeme({ 'loading': false, 'url': getMeme.data[nomor].url, 'nomor': nomor, "elemen-input": elin });
  }
  function createMeme(){
    let postdata = "template_id=" + getMeme.data[setMeme.nomor].id + "&username=" + document.getElementById('username').value + "&password=" + document.getElementById('password').value ;
    fungsiSetMeme({ "loading": true, "url":setMeme.url, "nomor": setMeme.nomor, "elemen-input": setMeme['elemen-input'] })
    for(let x=0;x<getMeme.data[setMeme.nomor].box_count;x++){
      postdata +="& boxes["+x+"][text]=" + document.getElementById('text-'+(x+1)).value
    }
    fetch("https://api.imgflip.com/caption_image",{
      method:"POST",
      headers:{
        "Content-Type":"application/x-www-form-urlencoded"
      },
      body: postdata
    })
    .then(hasil=>hasil.json())
    .then(function(hasil){
      if(hasil.success===true){
        fungsiSetMeme({"loading":false,"url":hasil.data.url,"nomor":setMeme.nomor,"elemen-input":setMeme['elemen-input']})
      }
      else{
        alert(hasil.error_message);
        fungsiSetMeme(function(nilai_lama){
          let nilai_baru = { ...nilai_lama, "loading": false }
          return nilai_baru;
        })
      }
      return hasil;
    })
  }
  React.useEffect(function(){
    function init() {
      fetch('https://api.imgflip.com/get_memes')
        .then(hasil => hasil.json())
        .then(function (hasil) {
          fungsiGetMeme({ "data": hasil.data.memes})
          fungsiSetMeme({ 'loading': true, 'url': setMeme.url, 'nomor': 0, "elemen-input": setMeme['elemen-input'] });
          return hasil;
        })
        .then(function(hasil){
          let elin=[];
          for (let x = 0; x < hasil.data.memes[0].box_count;x++){
            elin.push(<input key={x} class='textbox' type='text' placeholder={"text-" + (x + 1)} id={"text-" + (x + 1)} />)
          }
          fungsiSetMeme({'loading':false,'url': hasil.data.memes[0].url, 'nomor': 0 ,"elemen-input":elin});
          return hasil;
        })
        .then(function (hasil) {
          let opm = [
            <option key="0" value="-" selected>--pilih meme--</option>
          ];
          for (let x = 0; x < hasil.data.memes.length; x++) {
            opm.push(<option key={x+1} value={x} >{hasil.data.memes[x].name}</option>)
          }
          fungsiGetMeme(function (hasil_lama) {
            let hasil_baru = { ...hasil_lama, "opsi-pilih-meme": opm }
            console.log(hasil_baru);
            return hasil_baru;
          });
          return hasil;
        })
    }
    init();
  },[0])
    return (
        <div className="Content">
            <div className="inner-content">
                <form>
                  <div className='text-box'>
                    <input class='textbox' type='text' placeholder="username" id="username" />
                    <input class='textbox' type='password' placeholder="password" id="password" />
                  </div>
                  <div className='text-box'>
                    <select class='textbox' name="select-meme" onChange={selectMeme}>
                      {getMeme['opsi-pilih-meme']}
                    </select>
                  </div>
                    <div className='text-box'>
                      {setMeme["elemen-input"]}
                    </div>
                    <div className='button-box'>
                      <button class='button' type='button' onClick={getPrevMeme}>
                          Prev Meme
                      </button>
                      <button class='button' type='button' onClick={getNextMeme}>
                        Next Meme
                      </button>
                      <button class='button' type='button' onClick={createMeme}>
                        Generate Meme
                      </button>
                    </div>
                </form>
                {setMeme.loading===true ? <h2>Loading</h2>:<img
                    src={setMeme.url}
                />}

            </div>
        </div>
    )
}

export default Content;