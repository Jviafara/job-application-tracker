'use client'

import Image from 'next/image'
import { Button } from './ui/button'
import { useState } from 'react'

const HeroImages = () => {
  const [activeTab, setActiveTab] = useState('organize')
  return (
    <section className='border-b bg-white py-16'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-6xl'>
          {/* Tabs */}
          <div className='flex gap-2 justify-center mb-8'>
            <Button
              onClick={() => setActiveTab('organize')}
              variant={activeTab === 'organize' ? 'default' : 'outline'}
              className='rounded-lg px-6 py-3 text-sm font-medium transition-colors'
            >
              Organize Applications
            </Button>
            <Button
              onClick={() => setActiveTab('get-hired')}
              variant={activeTab === 'get-hired' ? 'default' : 'outline'}
              className='rounded-lg px-6 py-3 text-sm font-medium transition-colors'
            >
              Get Hired
            </Button>
            <Button
              onClick={() => setActiveTab('manage-boards')}
              variant={activeTab === 'manage-boards' ? 'default' : 'outline'}
              className='rounded-lg px-6 py-3 text-sm font-medium transition-colors'
            >
              Manage Boards
            </Button>
          </div>
          {/* Tabs */}
          {/* Images */}
          <div className='relative mx-auto max-w-5xl overflow-hidden rounded-lg border border-gray-200 shadow-xl'>
            {activeTab === 'organize' && (
              <Image
                src='/hero-images/hero1.png'
                alt='Organize Applications'
                width={1200}
                height={800}
                className='mx-auto rounded-lg shadow-lg'
              />
            )}
            {activeTab === 'get-hired' && (
              <Image
                src='/hero-images/hero2.png'
                alt='Get Hired'
                width={1200}
                height={800}
                className='mx-auto rounded-lg shadow-lg'
              />
            )}
            {activeTab === 'manage-boards' && (
              <Image
                src='/hero-images/hero3.png'
                alt='Manage Boards'
                width={1200}
                height={800}
                className='mx-auto rounded-lg shadow-lg'
              />
            )}
          </div>
          {/* Images */}
        </div>
      </div>
    </section>
  )
}

export default HeroImages
