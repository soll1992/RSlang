import React from 'react';
import Particles from 'react-tsparticles';

const ParticlesApp = () => {
  // const particlesInit = (main): Promise<void> => {
  //   return
  // };

  // const particlesLoaded = (container): Promise<void> => {
  //   return
  // };

  return (
    <div className="home-particles">
      <Particles
        id="tsparticles"
        // init={particlesInit}
        // loaded={particlesLoaded}
        options={{
          zIndex: {
            value: '-1',
          },
          background: {
            color: {
              value: 'transparent',
            },
          },
          fpsLimit: 30,
          interactivity: {
            events: {
              onClick: {
                enable: false,
                mode: 'none',
              },
              onHover: {
                enable: false,
                mode: 'none',
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 50,
                duration: 2,
                opacity: 0.8,
                size: 10,
              },
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: '#ffffff',
            },
            links: {
              color: '#ffffff',
              distance: 0,
              enable: false,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: 'none',
              enable: true,
              outMode: 'bounce',
              random: false,
              speed: 0.2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 600,
              },
              value: 20,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: 'circle',
            },
            size: {
              random: true,
              value: 5,
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default ParticlesApp;
