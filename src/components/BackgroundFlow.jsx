import React from 'react';

const BackgroundFlow = () => {
  return (
    <div
      className="fixed inset-0 w-full h-full -z-50 pointer-events-none bg-gradient-to-br from-purple-100 via-white to-pink-100 opacity-60"
      style={{
        /* SAFARI PERFORMANCE HACK: Forces GPU layer promotion */
        transform: 'translate3d(0, 0, 0)',
        willChange: 'transform'
      }}
    />
  );
};

export default BackgroundFlow;