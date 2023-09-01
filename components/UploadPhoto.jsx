'use client'
import React,{useEffect,useState,useRef} from 'react';
import Spinner from './Loading/Spinner';
import ErrorException from './error/ErrorException';
const UploadPhoto = ({change_image,loading_post}) => {
    const searchBoxRef = useRef(null);
  const fileInputRef = useRef(null);
    const [media, setmedia] = useState([]);
  const [option, setoption] = useState(false);
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (
            searchBoxRef.current &&
            !searchBoxRef.current.contains(event.target)
          ) {
            setoption(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [option]);

      const handleSelectFile = () => {
        fileInputRef.current.click();
      };
    
      const handleFileInputChange = async (event) => {
  
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setmedia((e) => [...e, reader.result]);
        };
    
      };


      useEffect(() => {
        if(media.length>1){
            setmedia([media[1]])
        }
      }, [media]);



    return (
            <div id='getting_name' className='w-full h-screen flex justify-center items-center'>
        <div className=' w-1/3 m-auto bg-slate-900 rounded-xl h-4/5 pt-6 flex flex-col items-center '>
            <button onClick={handleSelectFile} className=' w-2/3 border-2 text-white border-white flex flex-col items-center justify-center' style={{borderRadius:"100%", height: "18rem"}}>
                    { media.length ===1 ? <img src={media[0]} style={{height:"100%",width:"100%",borderRadius:"100%"}} /> : <>Upload Picture</>}
            </button>
                    <div className=' text-center text-white'>Click to edit the photo</div>
                    <div className=' text-center text-red-600'>You can always Change this picture in profile menu</div>
            <input className=' hidden' ref={fileInputRef}
                onChange={handleFileInputChange}
                 type='file' />
            <div className='w-full flex items-center justify-center mt-8'>
                <button
            onClick={()=>{change_image(media)}}
            className=" w-40 h-14 background_of_sub_component_contrast rounded-xl text-lg text-white flex items-center justify-center"
          >
            {!loading_post ? <div>Sign Up</div> : <div className=" pt-2 pr-2 w-full h-full flex item-center justify-center"><Spinner/></div>}
          </button>
            </div>
        </div>
        </div>
    );
}

export default UploadPhoto;
