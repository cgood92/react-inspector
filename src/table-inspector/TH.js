import React, { Component } from 'react'
import PropTypes from 'prop-types'

import createStyles from '../styles/createStyles'

const SortIconContainer = (props) =>
  <div style={{
      position: 'absolute',
      top: 1,
      right: 0,
      bottom: 1,
      display: 'flex',
      alignItems: 'center'
    }}>
    {props.children}
  </div>

const SortIcon = ({ sortAscending }, { theme }) => {
  const glyph = sortAscending ? '▲' : '▼'
  const styles = createStyles('TableInspectorSortIcon', theme)
  return (
    <div style={styles}>
      {glyph}
    </div>
  )
}

SortIcon.contextTypes = {
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
}

class TH extends Component {
  state = { hovered: false }

  toggleHovered(hovered){
    this.setState({hovered: hovered})
  }

  render() {
    // either not sorted, sort ascending or sort descending
    const { sorted, sortAscending } = this.props
    const { theme } = this.context
    const styles = createStyles('TableInspectorTH', theme)

    return (
      <th {...this.props}
          style={{...styles.base,
                  ...this.props.borderStyle,
                  ...((this.state.hovered) ? styles.base[':hover'] : {})
                }}
          onMouseEnter={ this.toggleHovered.bind(this, true) }
          onMouseLeave={ this.toggleHovered.bind(this, false) }
          onClick={ this.props.onClick } >
        <div style={styles.div}>
          {this.props.children}
        </div>
        {(() => {
          if(sorted){
            return (
              <SortIconContainer>
                <SortIcon sortAscending={sortAscending} />
              </SortIconContainer>
            )
          }
        })()}
      </th>
    )
  }
}

TH.contextTypes = {
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
}

TH.defaultProps = {
  sortAscending: false,
  sorted: false,
  onClick: undefined
}

export default TH
