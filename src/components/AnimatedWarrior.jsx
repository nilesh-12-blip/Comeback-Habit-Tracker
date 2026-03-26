export default function AnimatedWarrior() {
  return (
    <div style={{ position: "relative", width: "100%", height: "400px", perspective: "1200px" }}>
      {/* 3D Warrior Container */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transformStyle: "preserve-3d",
      }}>
        {/* Flame Particles 1 */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`flame-${i}`}
            style={{
              position: "absolute",
              width: "40px",
              height: "60px",
              left: "50%",
              top: "20%",
              transform: `translateX(-50%) rotate(${i * 45}deg) translateY(-100px)`,
              animation: `flames-dance ${2 + i * 0.2}s ease-in-out infinite`,
            }}
          >
            <div style={{
              width: "100%",
              height: "100%",
              background: `linear-gradient(180deg, #ff6b35 0%, #f97316 50%, transparent 100%)`,
              borderRadius: "50% 50% 50% 0",
              transform: "rotate(-45deg)",
              opacity: 0.8,
              filter: "drop-shadow(0 0 10px rgba(249,115,22,0.6))",
              animation: `flame-flicker 0.3s ease-in-out infinite`,
            }} />
          </div>
        ))}

        {/* Warrior Body - Using Styles */}
        <div style={{
          position: "relative",
          width: "200px",
          height: "300px",
          transformStyle: "preserve-3d",
          animation: "warrior-stance 4s ease-in-out infinite",
        }}>
          {/* Head */}
          <div style={{
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60px",
            height: "70px",
            background: "linear-gradient(135deg, #8b7355, #6b5344)",
            borderRadius: "50% 50% 45% 45%",
            boxShadow: "0 0 20px rgba(249,115,22,0.3), inset -2px -2px 5px rgba(0,0,0,0.3)",
            animation: "head-rotation 3s ease-in-out infinite",
          }}>
            {/* Eyes Glowing */}
            <div style={{
              position: "absolute",
              top: "25px",
              left: "15px",
              width: "8px",
              height: "8px",
              background: "#ffd700",
              borderRadius: "50%",
              boxShadow: "0 0 10px rgba(255,215,0,0.8), 0 0 20px rgba(249,115,22,0.5)",
              animation: "glow-pulse 1.5s ease-in-out infinite",
            }} />
            <div style={{
              position: "absolute",
              top: "25px",
              right: "15px",
              width: "8px",
              height: "8px",
              background: "#ffd700",
              borderRadius: "50%",
              boxShadow: "0 0 10px rgba(255,215,0,0.8), 0 0 20px rgba(249,115,22,0.5)",
              animation: "glow-pulse 1.5s ease-in-out infinite",
            }} />
          </div>

          {/* Helmet */}
          <div style={{
            position: "absolute",
            top: "-10px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "70px",
            height: "40px",
            background: "linear-gradient(135deg, #ffb347, #ff9f43, #ff6b35)",
            borderRadius: "50% 50% 40% 40%",
            boxShadow: "0 5px 20px rgba(249,115,22,0.5), inset 1px 1px 5px rgba(255,255,255,0.3)",
            animation: "helmet-glow 2s ease-in-out infinite",
          }} />

          {/* Armor / Chest Plate */}
          <div style={{
            position: "absolute",
            top: "70px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80px",
            height: "100px",
            background: "linear-gradient(135deg, #e8b4b8, #d4949a, #c07a82)",
            borderRadius: "10px 10px 0 0",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5), inset 1px 1px 8px rgba(255,255,255,0.2), 0 0 15px rgba(249,115,22,0.3)",
            animation: "armor-shine 3s ease-in-out infinite",
          }}>
            {/* Golden Crest */}
            <div style={{
              position: "absolute",
              top: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "40px",
              height: "30px",
              background: "linear-gradient(135deg, #ffd700, #ffed4e)",
              borderRadius: "50% 50% 45% 45%",
              boxShadow: "0 0 20px rgba(255,215,0,0.8)",
            }} />
          </div>

          {/* Legs */}
          <div style={{
            position: "absolute",
            bottom: "0",
            left: "35%",
            width: "25px",
            height: "80px",
            background: "linear-gradient(90deg, #5a5a5a, #4a4a4a)",
            borderRadius: "5px",
            boxShadow: "inset 1px 1px 3px rgba(0,0,0,0.5)",
            animation: "leg-movement-left 2s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute",
            bottom: "0",
            right: "35%",
            width: "25px",
            height: "80px",
            background: "linear-gradient(90deg, #5a5a5a, #4a4a4a)",
            borderRadius: "5px",
            boxShadow: "inset 1px 1px 3px rgba(0,0,0,0.5)",
            animation: "leg-movement-right 2s ease-in-out infinite",
          }} />

          {/* Shield/Arm Left */}
          <div style={{
            position: "absolute",
            top: "80px",
            left: "-30px",
            width: "50px",
            height: "70px",
            background: "linear-gradient(135deg, #8b4513, #654321)",
            borderRadius: "10px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.5), inset 1px 1px 5px rgba(255,255,255,0.1)",
            transform: "rotateZ(-20deg)",
            animation: "shield-bounce 1.5s ease-in-out infinite",
          }}>
            <div style={{
              position: "absolute",
              top: "15px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "25px",
              height: "25px",
              background: "radial-gradient(circle, #ffd700, #ffb347)",
              borderRadius: "50%",
              boxShadow: "0 0 15px rgba(255,215,0,0.8)",
            }} />
          </div>

          {/* SWORD - 3D Animated */}
          <div style={{
            position: "absolute",
            top: "60px",
            right: "-60px",
            width: "80px",
            height: "25px",
            transformStyle: "preserve-3d",
            animation: "sword-swing 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) infinite",
          }}>
            {/* Sword Blade */}
            <div style={{
              position: "absolute",
              top: "0",
              left: "20px",
              width: "60px",
              height: "12px",
              background: "linear-gradient(90deg, #c0c0c0, #ffffff, #c0c0c0)",
              borderRadius: "50% 50% 30% 30%",
              boxShadow: "0 0 20px rgba(255,255,255,0.6), 0 8px 15px rgba(249,115,22,0.4), inset 0 0 8px rgba(255,255,255,0.4)",
              transform: "skewY(-5deg)",
              transformStyle: "preserve-3d",
              animation: "blade-glow 1s ease-in-out infinite",
            }}>
              {/* Blade Edge */}
              <div style={{
                position: "absolute",
                top: "-3px",
                left: "0",
                width: "100%",
                height: "3px",
                background: "linear-gradient(90deg, #ff6b35, #ffed4e, #ff6b35)",
                borderRadius: "50%",
                filter: "blur(1px)",
                animation: "edge-flame 1.5s ease-in-out infinite",
              }} />
            </div>

            {/* Sword Guard */}
            <div style={{
              position: "absolute",
              top: "8px",
              left: "15px",
              width: "15px",
              height: "25px",
              background: "linear-gradient(90deg, #ffd700, #ffed4e)",
              borderRadius: "3px",
              boxShadow: "0 0 15px rgba(255,215,0,0.7)",
            }} />

            {/* Sword Handle */}
            <div style={{
              position: "absolute",
              top: "8px",
              left: "0",
              width: "15px",
              height: "25px",
              background: "linear-gradient(90deg, #8b4513, #654321)",
              borderRadius: "3px",
              boxShadow: "inset 0 0 5px rgba(0,0,0,0.5)",
            }} />

            {/* Sword Glow Trail */}
            <div style={{
              position: "absolute",
              top: "5px",
              left: "20px",
              width: "55px",
              height: "15px",
              background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.4), transparent)",
              borderRadius: "50%",
              filter: "blur(8px)",
              animation: "sword-trail 1.5s ease-in-out infinite",
            }} />
          </div>

          {/* Arm Right (holding sword) */}
          <div style={{
            position: "absolute",
            top: "75px",
            right: "-15px",
            width: "30px",
            height: "60px",
            background: "linear-gradient(90deg, #8b7355, #6b5344)",
            borderRadius: "15px",
            boxShadow: "inset 1px 1px 3px rgba(0,0,0,0.3)",
            animation: "arm-raise 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) infinite",
          }} />
        </div>

        {/* Fire Ring (Large) */}
        <div style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          border: "3px solid transparent",
          borderImage: "linear-gradient(45deg, #ff6b35, #ffed4e, #ff6b35) 1",
          borderRadius: "50%",
          animation: "fire-ring-rotate 4s linear infinite",
          boxShadow: "0 0 30px rgba(249,115,22,0.4), inset 0 0 30px rgba(249,115,22,0.2)",
        }} />

        {/* Explosion Particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`particle-${i}`}
            style={{
              position: "absolute",
              width: "8px",
              height: "8px",
              left: "50%",
              top: "50%",
              borderRadius: "50%",
              background: i % 2 === 0 ? "#ff6b35" : "#ffed4e",
              animation: `explosion-burst ${1.5 + i * 0.1}s ease-out infinite`,
              animationDelay: `${i * 0.05}s`,
              boxShadow: `0 0 ${10 + i * 2}px ${i % 2 === 0 ? "rgba(255,107,53,0.6)" : "rgba(255,237,74,0.6)"}`,
            }}
          />
        ))}

        {/* Central Glow */}
        <div style={{
          position: "absolute",
          width: "150px",
          height: "150px",
          background: "radial-gradient(circle, rgba(249,115,22,0.3) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "central-glow 2s ease-in-out infinite",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }} />
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes warrior-stance {
          0%, 100% { transform: translateY(0) rotateX(5deg); }
          50% { transform: translateY(-10px) rotateX(8deg); }
        }

        @keyframes head-rotation {
          0%, 100% { transform: translateX(-50%) rotateY(-10deg); }
          50% { transform: translateX(-50%) rotateY(10deg); }
        }

        @keyframes helmet-glow {
          0%, 100% { boxShadow: 0 5px 20px rgba(249,115,22,0.5), inset 1px 1px 5px rgba(255,255,255,0.3); }
          50% { boxShadow: 0 5px 30px rgba(249,115,22,0.8), inset 1px 1px 8px rgba(255,255,255,0.5), 0 0 20px rgba(255,215,0,0.5); }
        }

        @keyframes armor-shine {
          0%, 100% { boxShadow: 0 10px 30px rgba(0,0,0,0.5), inset 1px 1px 8px rgba(255,255,255,0.2), 0 0 15px rgba(249,115,22,0.3); }
          50% { boxShadow: 0 10px 40px rgba(0,0,0,0.6), inset 1px 1px 12px rgba(255,255,255,0.4), 0 0 25px rgba(249,115,22,0.6); }
        }

        @keyframes leg-movement-left {
          0%, 100% { transform: rotateZ(-15deg); }
          50% { transform: rotateZ(15deg); }
        }

        @keyframes leg-movement-right {
          0%, 100% { transform: rotateZ(15deg); }
          50% { transform: rotateZ(-15deg); }
        }

        @keyframes shield-bounce {
          0%, 100% { transform: rotateZ(-20deg) translateY(0); }
          50% { transform: rotateZ(-25deg) translateY(-5px); }
        }

        @keyframes sword-swing {
          0% { transform: rotateZ(-45deg) rotateY(0deg); }
          50% { transform: rotateZ(45deg) rotateY(20deg); }
          100% { transform: rotateZ(-45deg) rotateY(0deg); }
        }

        @keyframes blade-glow {
          0%, 100% { boxShadow: 0 0 20px rgba(255,255,255,0.6), 0 8px 15px rgba(249,115,22,0.4), inset 0 0 8px rgba(255,255,255,0.4); }
          50% { boxShadow: 0 0 30px rgba(255,255,255,0.8), 0 12px 25px rgba(249,115,22,0.7), inset 0 0 12px rgba(255,255,255,0.6), 0 0 20px rgba(255,215,0,0.5); }
        }

        @keyframes edge-flame {
          0%, 100% { background: linear-gradient(90deg, #ff6b35, #ffed4e, #ff6b35); }
          50% { background: linear-gradient(90deg, #ff6b35, #ffffff, #ff6b35); filter: brightness(1.2); }
        }

        @keyframes sword-trail {
          0%, 100% { background: linear-gradient(90deg, transparent, rgba(249,115,22,0.4), transparent); }
          50% { background: linear-gradient(90deg, transparent, rgba(249,115,22,0.8), transparent); }
        }

        @keyframes arm-raise {
          0%, 100% { transform: rotateZ(-30deg); }
          50% { transform: rotateZ(30deg); }
        }

        @keyframes fire-ring-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes flames-dance {
          0%, 100% { transform: translateX(-50%) rotate(var(--angle)) translateY(-100px) translateY(0); }
          25% { transform: translateX(-50%) rotate(var(--angle)) translateY(-100px) translateY(-10px); }
          75% { transform: translateX(-50%) rotate(var(--angle)) translateY(-100px) translateY(10px); }
        }

        @keyframes flame-flicker {
          0%, 100% { opacity: 0.8; filter: brightness(1); }
          50% { opacity: 1; filter: brightness(1.2); }
        }

        @keyframes glow-pulse {
          0%, 100% { boxShadow: 0 0 10px rgba(255,215,0,0.8), 0 0 20px rgba(249,115,22,0.5); }
          50% { boxShadow: 0 0 15px rgba(255,215,0,1), 0 0 30px rgba(249,115,22,0.8); }
        }

        @keyframes explosion-burst {
          0% { 
            transform: translate(-50%, -50%) translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(calc(cos(${Math.random() * Math.PI * 2}) * 200px), calc(sin(${Math.random() * Math.PI * 2}) * 200px)) scale(0);
            opacity: 0;
          }
        }

        @keyframes central-glow {
          0%, 100% { 
            boxShadow: 0 0 40px rgba(249,115,22,0.4);
            transform: translate(-50%, -50%) scale(1);
          }
          50% { 
            boxShadow: 0 0 80px rgba(249,115,22,0.7);
            transform: translate(-50%, -50%) scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}
