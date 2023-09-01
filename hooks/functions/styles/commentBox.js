const handleClickOpen = (setOpen,UserDetails,router) => {
  if(UserDetails === null || UserDetails === '' || !UserDetails){
    router.push('/Login')
  }
  else{
    setOpen(true);
  }
  };
  const handleClose = (setOpen) => {
    setOpen(false);
  };
module.exports = {handleClose,handleClickOpen}