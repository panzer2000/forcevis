import { useRef, useEffect } from 'react'

function resizeCanvasToDisplaySize(canvas) {
    
    const { width, height } = canvas.getBoundingClientRect()



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
      context.canvas.width  = window.innerWidth - 5;
      context.canvas.height = window.innerHeight- 5;
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