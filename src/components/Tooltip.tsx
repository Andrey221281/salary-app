import React, { useState } from 'react';
import classnames from 'classnames';

export const Tooltip: React.FC = () => {
  const [tooltp, setTolltip] = useState(false);

  const classNames = classnames(
    'tooltip bg-tooltip text-white p-3',
    tooltp ? 'visible' : 'invisible'
  );

  return (
    <div
      onClick={() => setTolltip(!tooltp)}
      className="tooltip-icon border p-1 rounded-circle text-secondary"
    >
      <div className={classNames}>
        МРОТ - минимальный размер оплаты труда. Разный для разных регионов.
      </div>
      {tooltp ? 'x' : 'i'}
    </div>
  );
};
