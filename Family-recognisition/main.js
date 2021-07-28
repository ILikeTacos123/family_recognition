Webcam.set({
    width: 300,
    height: 300,
    image_format: 'png',
    png_quality: 90 
});

camera = document.getElementById("webcam");

Webcam.attach(camera);

function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img src="+data_uri+" id='captured_image'>"
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier ("https://teachablemachine.withgoogle.com/models/X6cqCy4L1/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model is loaded");
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("member-name").innerHTML=results[0].label;
        document.getElementById("member-accuracy").innerHTML=results[0].confidence.toFixed(3)
    }
}