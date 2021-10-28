import Matter from 'matter-js'
import { useEffect, useRef } from 'react'
import pokeball from '../static/images/pokeball.png'

const BALLS_COUNT = 50
const BALL_RADIUS = 10
const CANVAS_WIDTH = 600
const CANVAS_HEIGHT = 600
const ballImagePaths = [
    'static/images/pokeball.png'
]

const MatterBall = () => {
    const canvasRef = useRef()
    const boxRef = useRef()

    const balls = []

    useEffect(() => {
        const Engine = Matter.Engine,
            Render = Matter.Render,
            Composite = Matter.Composite,
            Bodies = Matter.Bodies,
            Body = Matter.Body,
            Runner = Matter.Runner,
            Events = Matter.Events
        const engine = Engine.create({})
        const runner = Runner.run(engine)
        // mount      
        let render = Render.create({
            element: boxRef.current,
            engine: engine,
            canvas: canvasRef.current,
            options: {
                width: CANVAS_WIDTH,
                height: CANVAS_HEIGHT,
                background: 'transparent',
                wireframes: false,
            },
        })

        const createBall = () => {
            const ball = Bodies.circle(
                render.canvas.width / 2 - BALL_RADIUS,
                render.canvas.height / 2 - 2 * BALL_RADIUS,
                BALL_RADIUS, {
                restitution: 1.03,
                render: {
                    sprite: { // 設置圖片，在texture屬性上設置一個圖片路徑就可以了
                        // texture: "https://csdnimg.cn/cdn/content-toolbar/csdn-write.png"
                        texture: pokeball,
                    },

                    fillStyle: 'yellow',

                }
            })
            balls.push(ball)
            return ball
        }

        const onRenderTick = () => {
            balls.forEach(ball => {
                if (ball.position.y >= render.canvas.height - 100) {
                    Body.applyForce(ball, { x: ball.position.x, y: ball.position.y }, { x: 0.003, y: -0.003 })
                }
                if (ball.position.y < 120) {
                    Body.applyForce(ball, { x: ball.position.x, y: ball.position.y }, { x: -0.003, y: 0.003 })
                }

                if (ball.position.x < 80) {
                    Body.applyForce(ball, { x: ball.position.x, y: ball.position.y }, { x: 0.003, y: -0.003 })
                }

                if (ball.position.x > render.canvas.width - 80) {
                    Body.applyForce(ball, { x: ball.position.x, y: ball.position.y }, { x: -0.003, y: 0.003 })
                }
            })
        }

        // Add the balls to the scene
        for (let i = 0; i < BALLS_COUNT; i++) {
            Composite.add(engine.world, createBall())
        }
        console.log(balls)

        // run the engine
        Engine.run(engine)
        Render.run(render)

        /**
     * Build the circle bounds - BEGIN
     * */
        const addBody = (...bodies) => {
            Composite.add(engine.world, ...bodies)
        }

        const addRect = ({ x = 0, y = 0, w = 10, h = 10, options = {} } = {}) => {
            const body = Bodies.rectangle(x, y, w, h, options)
            addBody(body)
            return body
        }

        const sW = CANVAS_WIDTH
        const sH = CANVAS_WIDTH
        const m = Math.min(sW, sH)
        const rat = 1 / 4.5 * 2
        const r = m * rat
        const pegCount = 64
        const TAU = Math.PI * 2
        for (let i = 0; i < pegCount; i++) {
            const segment = TAU / pegCount
            const angle2 = i / pegCount * TAU + segment / 2
            const x2 = Math.cos(angle2)
            const y2 = Math.sin(angle2)
            const cx2 = x2 * r + sW / 2
            const cy2 = y2 * r + sH / 2
            addRect({
                x: cx2,
                y: cy2,
                w: 100 / 1000 * m,
                h: 3000 / 1000 * m,
                options: {
                    angle: angle2,
                    isStatic: true,
                    density: 1,
                    render: {
                        fillStyle: 'transparent',
                        strokeStyle: 'white',
                        lineWidth: 0
                    }
                }
            })
        }
        // Build the circle bounds - END

        // Start the blowing with X seconds delay
        // setTimeout(() => {
        //     Events.on(runner, 'tick', onRenderTick)
        // }, 3000);

        // unmount
        return () => {
            // destroy Matter
            Render.stop(render)
            Composite.clear(engine.world)
            Engine.clear(engine)
            render.canvas.remove()
            render.canvas = null
            render.context = null
            render.textures = {}
        }
    }, [])

    return (
        <canvas ref={canvasRef} />
    )
}

export default MatterBall