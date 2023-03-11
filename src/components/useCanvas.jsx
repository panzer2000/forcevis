import { useRef, useEffect } from 'react'

function resizeCanvasToDisplaySize(context) {
    
    const { width, height } = context.canvas.getBoundingClientRect()
    // context.canvas.width  = window.innerWidth - 200;
    // context.canvas.height = window.innerHeight;

    var parent = context.canvas.parentNode,
    styles = getComputedStyle(parent),
    w = parseInt(styles.getPropertyValue("width"), 10),
    h = parseInt(styles.getPropertyValue("height"), 10);

    context.canvas.width = w - 2;
    context.canvas.height = h;

    return false
  }

const useCanvas = (draw, options={}) => {
  
  const canvasRef = useRef(null)
  
  useEffect(() => {
    
    const canvas = canvasRef.current


    const context = canvas.getContext(options.context || '2d')
    let frameCount = 0
    let animationFrameId
    const render = () => {
      frameCount++
      resizeCanvasToDisplaySize(context)
      //context.canvas.width  = window.innerWidth - 5;
      //context.canvas.height = window.innerHeight- 5;
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
  return canvasRef
}



export default useCanvas