import { useRef, useEffect } from 'react'

function resizeCanvasToDisplaySize(context) {
    
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