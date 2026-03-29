

const MODEL_URL = '../siedg/models/'
 facejasaready = false;

async function cargaFaceJasaModels() {
    // load face detection, face landmark model and face recognition models
    await faceapi.loadFaceDetectionModel(MODEL_URL)
    await faceapi.loadFaceLandmarkModel(MODEL_URL)
    await faceapi.loadFaceRecognitionModel(MODEL_URL)
    facejasaready = true;

}

async function comparaJasaFaces(img1, img2) {
    if (facejasaready) {

        const img1 = await faceapi.fetchImage(img1)
        const img2 = await faceapi.fetchImage(img2)

        const fullFaceDescription1 = await faceapi.detectSingleFace(img1).withFaceLandmarks().withFaceDescriptor()
        const fullFaceDescriptors1 = [fullFaceDescription1.descriptor]
        if (!fullFaceDescription1) {
            console.log("Jasa face sin imagen 1")
            return true;

        }
        const fullFaceDescription2 = await faceapi.detectSingleFace(img2).withFaceLandmarks().withFaceDescriptor()
        const fullFaceDescriptors2 = [fullFaceDescription2.descriptor]

        if (!fullFaceDescription1) {
            console.log("Jasa face sin imagen 2")
            return true;
        }

        const distance = faceapi.euclideanDistance(fullFaceDescriptors1[0], fullFaceDescriptors2[0])


        if(distance < 0.5){
            console.log("Jasa face distance misma persona:  distance")
            return true
        }
        else {
            console.log("Jasa face distance otra persona:  distance")

            return false
        }
     
    } else {
        console.log("Sin Jasa face models 1")
        return true }

}

