import { Button } from "@mui/material";


export default function delcomp(props){


    const submitcode = () => {

       props.codesubmit();

    }


  return (

    <Button variant="outlined"
     sx={{margin:8}}
     onClick={submitcode}>Submit</Button>
       
  )
}


