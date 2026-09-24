import { Component } from 'react'

/**
 * WebGL is not guaranteed — blocked contexts, software rendering bailouts and
 * driver crashes all throw. The page is fully readable without the canvas, so
 * we swallow the error and render nothing rather than blanking the section.
 */
export default class SceneBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    if (import.meta.env.DEV) console.warn('3D scene disabled:', error)
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null
    return this.props.children
  }
}
