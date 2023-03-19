export function Banner(props) {
      

  console.log(props)
  const fn = props.fileName ?? "No Data FIle Loaded"

  return (
       <div>


    FORCE VISUALISATION GRAPH: 

        <span class="Spacer-h" style={{ color: "#488EF7"}}>{fn.split('\\').pop().split('/').pop()}</span>
      </div>
    )
  
    }
  
  
  export default Banner;
  