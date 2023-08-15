import { delay, motion } from 'framer-motion';
import smile from '@/public/smile.gif';
import Image from 'next/image';

export default function OrderAnimation() {
  return (
    <div className='flex items-center justify-center flex-col mt-24'>
      <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        Prepping your order🚀
      </motion.h1>
      <Image src={smile} alt='Fantastic mr fox smiling' className='py-8' />
    </div>
  );
}
