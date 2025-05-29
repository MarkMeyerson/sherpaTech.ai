import React from 'react';

const ContentRenderer = ({ type, items, icon, toggleCompletion, deviceInfo }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="mb-8 sm:mb-10">
      <div className="flex items-center mb-4 sm:mb-6">
        <span className="text-2xl sm:text-3xl mr-3 sm:mr-4">{icon}</span>
        <div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-navy-blue mobile-title">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mt-1 mobile-subtitle">
            {items[0]?.definition || `${type.charAt(0).toUpperCase() + type.slice(1)} content for enhanced learning`}
          </p>
        </div>
      </div>
      <div className={`grid gap-4 lg:gap-6 ${
        deviceInfo.isMobile 
          ? 'mobile-card-grid grid-cols-1' 
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 tablet-grid'
      }`}>
        {items.map((item) => (
          <div 
            key={item.id} 
            className="bg-white rounded-xl shadow-sm border border-ice-blue hover:shadow-md hover:border-navy-blue transition-all duration-300 overflow-hidden group"
          >
            {type === 'videos' && item.embedUrl && (
              <div className="aspect-video bg-gray-100 relative overflow-hidden">
                <iframe
                  src={item.embedUrl}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={item.title}
                ></iframe>
              </div>
            )}
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={!!item.completed}
                    onChange={() => toggleCompletion(item.id)}
                    className="w-5 h-5 text-navy-blue border-gray-300 rounded focus:ring-navy-blue focus:ring-2 transition-colors duration-200"
                  />
                  <span className="ml-3 text-sm font-medium text-navy-blue">
                    {item.completed ? 'Completed' : 'Mark Complete'}
                  </span>
                </div>
                {(item.duration || item.estimatedTime) && (
                  <span className="text-xs bg-ice-blue text-navy-blue px-2 py-1 rounded-full font-medium">
                    {item.duration || item.estimatedTime}
                  </span>
                )}
              </div>
              <h4 className="font-semibold text-navy-blue mb-2 group-hover:text-mountain-blue transition-colors duration-200 leading-tight">
                {item.title}
              </h4>
              {item.description && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-2">
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-navy-blue text-white text-center py-2 px-4 rounded-lg hover:bg-mountain-blue transition-colors duration-200 text-sm font-medium"
                  >
                    {type === 'videos' ? 'Watch' : type === 'readings' ? 'Read' : 'Open'}
                  </a>
                )}
                {item.downloadUrl && (
                  <a
                    href={item.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-100 text-navy-blue text-center py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium border border-gray-300"
                  >
                    Download
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentRenderer;
