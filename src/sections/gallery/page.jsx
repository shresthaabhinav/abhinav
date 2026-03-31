'use client';

import styles from './styles.module.scss';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import img1 from '../../../public/image/cloud.jpg';
import img2 from '../../../public/image/chair.jpg';
import img3 from '../../../public/image/langtang.jpg';
import img4 from '../../../public/image/north_abc.jpg';
import img5 from '../../../public/image/lake.jpg';
import img6 from '../../../public/image/dhumba.jpg';
import img7 from '../../../public/image/anna.jpg';

export default function Parallax() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 4]);

  const pictures = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
  ];

  return (
    <>
    {/* Heading */}
        <div id="gallery" className="scroll-mt-20 flex flex-col items-center gap-3 mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold text-black"
          >
            Take A Quick <span style={{ color: "#999999" }}>Glimpse</span>
          </motion.h1>
        </div>
        
    <div ref={container} className={styles.container}>
      <div className={styles.sticky}>
        {pictures.map((src, index) => (
          <motion.div
            key={index}
            style={{ scale }}
            className={styles.el}
          >
            <div className={styles.imageContainer}>
              <Image
                src={src}
                alt="image"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder="blur"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    </>

  );
}