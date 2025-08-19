
import React from 'react';
import { Shield, Heart } from 'lucide-react';

const SafetyBanner = () => {
  return (
    <div className="bg-gradient-safe text-white p-4 rounded-2xl mb-6 mx-4">
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          <Shield className="w-5 h-5" />
          <Heart className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm">SafeChat Assistant</h3>
          <p className="text-xs opacity-90">Family-friendly AI that keeps conversations safe and helpful</p>
        </div>
      </div>
    </div>
  );
};

export default SafetyBanner;
