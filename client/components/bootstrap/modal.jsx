import React from 'react'

export class Modal extends React.Component {

  close(event) {
    event.preventDefault()
    this.props.onClose()
  }

  render() {
    return (
      <div>
        <div className="modal-backdrop in" onClick={this.close.bind(this)}></div>
        <div className="modal" style={{display: 'block', paddingLeft: '0px'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export function ModalHeader(props) {
  return (
    <div className="modal-header">
      <button className="close" type="button" onClick={props.onClose}>
        <span>&times;</span>
      </button>
      <h4 className="modal-title">{props.children}</h4>
    </div>
  )
}

export const ModalBody = (props) => <div className="modal-body">{props.children}</div>

export const ModalFooter = (props) => <div className="modal-footer">{props.children}</div>
