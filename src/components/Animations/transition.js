import { useContext, useRef } from 'react';
import { SwitchTransition, Transition } from 'react-transition-group';
import { useRouter } from 'next/router';
import gsap from 'gsap/dist/gsap';

const TransitionComponent = ({ children }) => {
  const router = useRouter();

  return (
    <SwitchTransition>
      <Transition
        key={router.pathname}
        timeout={700}
        onEnter={(node) => {
          gsap.set(node, { autoAlpha: 0 });

          gsap
            .timeline({
              paused: true,
            })
           
            .to(node, { autoAlpha: 1,  duration: 0.25 })
          
            .play();
        }}

        onExit={(node) => {
         
          gsap
            .timeline({ paused: true })
            .to(node, { autoAlpha: 0,  duration: 0.25 })
            .play();
        }}
      >
        <>
         <main>{children}</main> 
        
        </>
      </Transition>
    </SwitchTransition>
  );
};

export default TransitionComponent;
