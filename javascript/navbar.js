function resizeNav(){
  var winWidth =   $( window ).width();
  var nav = document.getElementById("nav");
  var logo = document.getElementById("name");
  var logoDiv = document.getElementById("logo");
  if (winWidth < 1283 && winWidth >= 976){
      logo.width= "328";
      logoDiv.style.textAlign = "left";
      nav.innerHTML =       '<a href="/"><img src="/images/home.png" height="30" hspace="5" vspace="20"></a>'+
          '<a href="/gallery/"><img src="/images/gallery.png" hspace="5" height="30" vspace="20"></a>'+
          '<a href="/resume/"><img src="/images/resume.png" hspace="5" height="30" vspace="20"></a>'+
          '<a href="/contact/"><img src="/images/contact.png" hspace="5" height="30" vspace="20"></a>';
      }    
    else if (winWidth < 976 && winWidth >= 495){
      logo.width= "328";
      logoDiv.style.textAlign = "left";
      nav.innerHTML =       '<a href="/"><img src="/images/home.png"  height="25" hspace="5" vspace="5"></a>'+
          '<a href="/gallery/"><img src="/images/gallery.png" height="25" hspace="5" vspace="5"></a>'+
          '<a href="/resume/"><img src="/images/resume.png" height="25" hspace="5" vspace="5"></a>'+
          '<a href="/contact/"><img src="/images/contact.png" height="25" hspace="5" vspace="5"></a>';
      }
    else if (winWidth < 495 && winWidth >= 324){
      logo.width= "315";
      logoDiv.style.textAlign = "center";
      nav.innerHTML =       '<a href="/"><img src="/images/home.png"  height="25" hspace="5" vspace="5"></a>'+
          '<a href="/resume/" style="float:right;"><img src="/images/resume.png" height="25" hspace="5" vspace="5"></a><br>'+
          '<a href="/gallery/"><img src="/images/gallery.png" height="25" hspace="5" vspace="5"></a>'+
          '<a href="/contact/" style="float:right;"><img src="/images/contact.png" height="25" hspace="5" vspace="5"></a>';      
    }
    else if (winWidth < 324 && winWidth >= 311){
      logo.width= "315";
      logoDiv.style.textAlign = "center";
      nav.innerHTML =       '<a href="/"><img src="/images/home.png"  height="25" hspace="5" vspace="5"></a>'+
          '<a href="/resume/" style="float:right;"><img src="/images/resume.png" height="25" hspace="5" vspace="5"></a><br>'+
          '<a href="/gallery/"><img src="/images/gallery.png" height="25" hspace="5" vspace="5"></a>'+
          '<a href="/contact/" style="float:right;"><img src="/images/contact.png" height="25" hspace="5" vspace="5"></a>';      
    }
    else if (winWidth < 311){
      logo.width= "315";
      logoDiv.style.textAlign = "center";
      nav.innerHTML =       '<a href="/"><img src="/images/home.png"  height="15" hspace="5" vspace="5"></a>'+
          '<a href="/resume/" style="float:right;"><img src="/images/resume.png" height="15" hspace="5" vspace="5"></a><br>'+
          '<a href="/gallery/"><img src="/images/gallery.png" height="15" hspace="5" vspace="5"></a>'+
          '<a href="/contact/" style="float:right;"><img src="/images/contact.png" height="15" hspace="5" vspace="5"></a>';       
    }    
    else{
        logo.width= "328";
       logoDiv.style.textAlign = "left";
        nav.innerHTML =       '<a href="/"><img src="/images/home.png" hspace="20" vspace="20"></a>'+
        '<a href="/gallery/"><img src="/images/gallery.png" hspace="20" vspace="20"></a>'+
        '<a href="/resume/"><img src="/images/resume.png" hspace="20" vspace="20"></a>'+
        '<a href="/contact/"><img src="/images/contact.png" hspace="20" vspace="20"></a>';
    } 
}
