window.addEventListener('scroll', function() {
    var distance = window.pageYOffset || document.documentElement.scrollTop; /* will give you where the scroll starts */
    var header = document.querySelector('header')
    if(distance > 200){
        header.classList.add('header--small')
    } else {
        header.classList.remove('header--small')
    }
})

function addClickEvents() {
    // Add click events to all the images
    const images = document.querySelectorAll('.image')
    images.forEach(function(image, index){ 
        //Add a click event to the image
        //have the click event consol.log(index)
        image.addEventListener('click', function(e) {
            e.preventDefault() //stop the click event from refreshing
            const source = this.querySelector('img').src
            const id = source.split('=')[1] //pulls out the number of the image from the src string
            showFullImage(id)
        })
    })
}
// Add Error Events to the images in case the image is not available
function addErrorEvents() {
    // Find the img tags inside the .image
    // Loop through them and add an "error" event
    // console.log('ERROR!') when that event occurs
    const images = document.querySelectorAll('.image img')
    images.forEach(function(image, index) {
        image.addEventListener('error', function(){
            //const next = Math.round(Math.random()*1000)
            //this.src = `https://unsplash.it/300/?image=${next}`
            this.src = `https://unsplash.it/300/?image=580`
        })
    })
}


//function showFullImage (id) {}
const showFullImage = id => {
    const fullContainer = document.querySelector('.full')  //the div
    const fullImage = fullContainer.querySelector('img')   //the image in the div
    //Set the src of the fullImage to be a bigger version 
    // of the same image
    fullImage.src = `https://unsplash.it/600/?image=${id}`
    //Remove the hidden class from the fullContainer to show it
    fullContainer.classList.remove('hidden')
}

// add click event to the .full DIV so it adds the hidden class when clicked
// 1) Declare variable for .full DIV
// 2) add click event
    const fullContainer = document.querySelector('.full')  //the div
    fullContainer.addEventListener('click', function() {
        this.classList.add('hidden')
    })

// var Image = {}

// Load Data from https://unsplash.it/list
//then convert to JSON
// then grab 20 random images
// then add images to HTML and call addClickEvents()

// Use fetch() to load remote data
    fetch('https://unsplash.it/list')
        .then(result => {
             return result.json()  //convert the text into JSON data   
             //could be written as .then(result => result.json())         
         })
        .then(result => {
            //Now that we have the data, we can work with it
             //Initializing an empty array to hold our random numbers
             let randoms = []
            //Loop 20 times, each time putting a random number in the array
             for (let i=0; i<20; i++) {
                 //Generate Random number: Math.round(Math.random()*N    **generates a number between 0 and 1 then rounds**
                randoms.push(Math.round(Math.random()*result.length))   
            }
            //Make an images array to store our random images 
             //filter goes through each image of the array and filters out the images to put in the array             
            let images = result.filter(image => {
                return randoms.includes(image.id)
            })
            populateImages(images)
            addClickEvents()
            addErrorEvents()
         })
           
//this function will add all the images we loaded remotely
// to the HTML page

function populateImages(imageArray) {
    //Need a variable for the image container
    const imageContainer = document.querySelector('.images .inner') 

    //then we need to loop through the imageArray   forEach
    //maybe just console.log somthing to make sure it working
    imageArray.forEach(function(image, index){ 
        const html= `<a href="" class="image">
                <img src="https://unsplash.it/300/?image=${image.id}" alt="${image.author}">
                <span class="image__cover">View Image</span>
            </a>` //use the backtick so that text can span multiple lines apostophes require all command to be on one line
        imageContainer.innerHTML += html    //sets the html paragraph into the html format x times using the +=
       
    })
}

/*            <a href="" class="image">
                <img src="https://unsplash.it/300/?image=222" alt="">
                <span class="image__cover">View Image</span>
            </a>
*/

