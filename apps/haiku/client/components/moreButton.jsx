import React from 'react'

import { SecondaryButton } from 'client/components/bootstrap/button'

export const LoadingMoreButton = (props) => (
  <SecondaryButton className="btn-lg btn-block" disabled={true}>
    <i className="fa fa-refresh fa-spin fa-fw"></i>
    <span className="sr-only">Loading...</span>
  </SecondaryButton>
)

export const MoreButton = (props) => (
  <SecondaryButton {...props} className="btn-lg btn-block">
    More
  </SecondaryButton>
)
