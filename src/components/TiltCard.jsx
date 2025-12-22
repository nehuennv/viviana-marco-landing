// Asegurate de importar esto arriba del todo:
// import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const TiltCard = ({ children }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
  
    // Física: Le bajé un poco el 'damping' para que se sienta más suelto
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });
  
    function onMouseMove({ currentTarget, clientX, clientY }) {
      const { left, top, width, height } = currentTarget.getBoundingClientRect();
      // Calculamos la posición del mouse relativa al centro de la tarjeta
      const xPos = clientX - left - width / 2;
      const yPos = clientY - top - height / 2;
      
      // Asignamos rotación. Cuanto menor el número divisor (20), más exagerado el movimiento.
      x.set(xPos / 20); 
      y.set(yPos / 20);
    }
  
    function onMouseLeave() {
      x.set(0);
      y.set(0);
    }
  
    // Transformamos coordenadas X/Y en Rotación Y/X
    const rotateX = useTransform(mouseY, (val) => -val); 
    const rotateY = useTransform(mouseX, (val) => val);
  
    return (
      // IMPORTANTE: La perspectiva va ACÁ, en el padre quieto.
      <div style={{ perspective: "1000px" }} className="h-full w-full">
        <motion.div
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d", // Esto mantiene el 3D en los hijos
          }}
          whileHover={{ scale: 1.02 }} // Un pequeño zoom al entrar
          className="h-full w-full origin-center" // origin-center es clave para que gire sobre su eje
        >
          {children}
        </motion.div>
      </div>
    );
  };