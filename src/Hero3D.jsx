import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Hero3D() {
  const mountRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const W = container.clientWidth;
    const H = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x4444aa, 0.6);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0x0071e3, 1.2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);
    const pointLight1 = new THREE.PointLight(0x7c3aed, 1.5, 50);
    pointLight1.position.set(-10, 5, 10);
    scene.add(pointLight1);
    const pointLight2 = new THREE.PointLight(0x0071e3, 1.2, 50);
    pointLight2.position.set(10, -5, 5);
    scene.add(pointLight2);

    // Materials
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x0071e3, metalness: 0.1, roughness: 0.05, transparent: true,
      opacity: 0.35, side: THREE.DoubleSide,
    });
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x7c3aed, wireframe: true, transparent: true, opacity: 0.25,
    });
    const glowMat = new THREE.MeshPhysicalMaterial({
      color: 0x22d3ee, metalness: 0.3, roughness: 0.1, transparent: true,
      opacity: 0.5, emissive: 0x0071e3, emissiveIntensity: 0.3,
    });

    // Floating geometries
    const shapes = [];

    // Central Torus Knot — hero centerpiece
    const torusKnot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(4, 1.2, 128, 32, 2, 3),
      glassMat
    );
    torusKnot.position.set(10, 0, -5);
    scene.add(torusKnot);
    shapes.push({ mesh: torusKnot, speed: 0.003, axis: "y", bob: 0.8 });

    // Wireframe Icosahedron
    const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(3, 1), wireMat);
    ico.position.set(-12, 4, -8);
    scene.add(ico);
    shapes.push({ mesh: ico, speed: 0.005, axis: "xy", bob: 1.2 });

    // Glowing Octahedron
    const octa = new THREE.Mesh(new THREE.OctahedronGeometry(2, 0), glowMat);
    octa.position.set(-8, -5, -3);
    scene.add(octa);
    shapes.push({ mesh: octa, speed: 0.008, axis: "xz", bob: 0.6 });

    // Small spheres cluster
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: 0x7c3aed, metalness: 0.4, roughness: 0.2, transparent: true, opacity: 0.5,
    });
    for (let i = 0; i < 8; i++) {
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.4 + Math.random() * 0.6, 16, 16), sphereMat);
      s.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 15 - 5
      );
      scene.add(s);
      shapes.push({ mesh: s, speed: 0.002 + Math.random() * 0.006, axis: "xyz", bob: 0.3 + Math.random() * 0.8 });
    }

    // Ring geometries
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x0071e3, transparent: true, opacity: 0.15, side: THREE.DoubleSide,
    });
    const ring1 = new THREE.Mesh(new THREE.RingGeometry(5, 5.3, 64), ringMat);
    ring1.position.set(8, 3, -10);
    ring1.rotation.x = Math.PI * 0.3;
    scene.add(ring1);
    shapes.push({ mesh: ring1, speed: 0.004, axis: "z", bob: 0 });

    const ring2 = new THREE.Mesh(new THREE.RingGeometry(3, 3.15, 64), ringMat.clone());
    ring2.material.color = new THREE.Color(0x7c3aed);
    ring2.material.opacity = 0.12;
    ring2.position.set(-6, -2, -12);
    ring2.rotation.x = Math.PI * 0.5;
    scene.add(ring2);
    shapes.push({ mesh: ring2, speed: 0.003, axis: "y", bob: 0 });

    // Particle system — floating dust
    const particleCount = 200;
    const pGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    const pSizes = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 60;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
      pSizes[i] = Math.random() * 2 + 0.5;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    pGeo.setAttribute("size", new THREE.BufferAttribute(pSizes, 1));
    const pMat = new THREE.PointsMaterial({
      color: 0x88aaff, size: 0.12, transparent: true, opacity: 0.6,
      blending: THREE.AdditiveBlending, sizeAttenuation: true,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Mouse tracking
    const onMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Animation loop — pauses when not visible, throttled to 30fps
    let frame = 0;
    let animId;
    let isVisible = true;
    let lastTime = 0;
    const observer = new IntersectionObserver(([entry]) => { isVisible = entry.isIntersecting; }, { threshold: 0.1 });
    observer.observe(container);
    
    const animate = (now) => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return; // Pause when scrolled past
      if (now - lastTime < 33) return; // Throttle to ~30fps
      lastTime = now;
      frame++;
      const t = frame * 0.01;

      // Mouse parallax on camera
      camera.position.x += (mouseRef.current.x * 3 - camera.position.x) * 0.02;
      camera.position.y += (-mouseRef.current.y * 2 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, -5);

      // Animate shapes
      shapes.forEach((s) => {
        if (s.axis.includes("x")) s.mesh.rotation.x += s.speed;
        if (s.axis.includes("y")) s.mesh.rotation.y += s.speed;
        if (s.axis.includes("z")) s.mesh.rotation.z += s.speed;
        if (s.bob) s.mesh.position.y += Math.sin(t * 0.8 + s.speed * 100) * s.bob * 0.01;
      });

      // Animate particles
      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(t + i) * 0.003;
        positions[i * 3] += Math.cos(t * 0.5 + i * 0.5) * 0.002;
      }
      particles.geometry.attributes.position.needsUpdate = true;
      particles.rotation.y = t * 0.02;

      // Pulse lights
      pointLight1.intensity = 1.2 + Math.sin(t * 1.5) * 0.4;
      pointLight2.intensity = 1.0 + Math.cos(t * 1.2) * 0.3;

      renderer.render(scene, camera);
    };
    animate(0);

    // Resize
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} style={{
      position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden",
    }} />
  );
}
