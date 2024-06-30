let model;
let webcam;

// 이 함수는 모바일넷 모델을 사용하여 웹캠에서 이미지를 분류합니다.
async function load() {
    // 모바일넷 모델을 로드합니다.
    model = await mobilenet.load();

    // 웹캠 요소를 가져오고 웹캠 객체를 만듭니다.
    const webcamElement = document.getElementById('webcam');
    webcam = await tf.data.webcam(webcamElement);
    console.log("webcam 연결됨");
    return { model, webcam }
}

async function run() {
    // 웹캠에서 이미지를 캡처합니다.
    const img = await webcam.capture();
    // 모바일넷 모델을 사용하여 이미지를 분류합니다.
    preds = await model.classify(img);

    // 분류 결과로 예측 텍스트를 업데이트합니다.
    // document.getElementById('predictions').innerHTML =
    //     `<p> <span style="font-style:bold;">prediction:</span> ${preds[0].className} <br><span style="font-style:bold;>probability:</span> ${preds[0].probability.toFixed(4)}</p>`;

    document.getElementById('predictions').innerHTML =
        `${preds[0].className}  <br> ${preds[0].probability.toFixed(4)}`;

    // 이미지 객체를 폐기합니다.
    img.dispose();

}

document.addEventListener("DOMContentLoaded", load);

