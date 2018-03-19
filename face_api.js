var renderResult = function renderResult(result){
  document.getElementById('attributes').innerHTML=result;
}

var renderImage = function renderImage(url){
  document.querySelector('img').src=url;
}

var FaceAPI = function FaceAPI(){
  const key = 'access_key';
  const endPoint = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0';
  const params = {
    "returnFaceId": "true",
    "returnFaceLandmarks": "true",
    "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
  };
  function analyseImage(url){
    let param= getParams();

    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'Accept' : 'application/json',
      'Ocp-Apim-Subscription-Key' : key
    });
    const data = {
      url: url
    };
    const initObject={
      method: 'POST',
      headers : myHeaders,
      body : JSON.stringify(data),
      mode : 'cors'
    };
    const request = new Request(`${endPoint}/detect${param}`,initObject);

    fetch(request)
    .then(function(response){
      if(response.ok)
        return response.json();
      else
        return Promise.reject(new Error(response.statusText));
    }).then(function(response){
      console.log(response);
      renderResult(`Age: ${response[0].faceAttributes.age} <br> Gender: ${response[0].faceAttributes.gender}`);
    }).catch(function(err){
      console.log(err);
      renderResult("");
      alert(err);
    });
  }

  function getParams(){
    let i = 0;
    let param = "";
    for(const [key,value] of Object.entries(params)){
      let delimiter = i== 0 ? '?':'&';
      param +=`${delimiter}${key}=${value}`;
      i++;
    };
    return param;
  }
  return {
    analyse: analyseImage
  };
}

var analyse = function analyse(){
  const url = document.getElementById('input').value;
  const faceApi = new FaceAPI();
  renderImage(url);
  faceApi.analyse(url);
}


document.getElementById('analyze').addEventListener('click',analyse);
