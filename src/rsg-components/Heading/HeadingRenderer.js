import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Slugger from 'github-slugger';

import './index.scss';

export default function HeadingRenderer({ level, type, children, section, ...props }) {
	const Tag = `h${level}`;

	if (!section) {
    const slugger = new Slugger();
    const id = slugger.slug(children[0]);
    return (
      <div id={id}>
        <Tag
          className={cx([
            'heading',
            `heading--level-${level}`,
            type ? `heading--type-${type}` : '',
          ])}
          {...props}
        >
          {children}
        </Tag>
      </div>
    );
  }

	return (
		<Tag
      className={cx([
        'heading',
        `heading--level-${level}`,
        type ? `heading--type-${type}` : '',
      ])}
      {...props}
    >
			{children}
		</Tag>
	);
}

HeadingRenderer.propTypes = {
	level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
  type: PropTypes.string,
	children: PropTypes.node,
  section: PropTypes.bool,
};
