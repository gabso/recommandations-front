import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import Modal from 'react-modal';
import {toJS} from 'mobx';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
}

Modal.setAppElement('#root')

export default inject('store')(
observer (
class MainPage extends Component {

    async componentDidMount(){
     await   this.props.store.fetchCurrRecommandation()
    }


 
  closeModal = async (userDecision) => {
    this.props.store.sendDecision( {userDecision,'productId': this.props.store.Recommandation.id, 'userId':'1'});

    this.props.store.setIsModalOpen(false);

   // this.fetchRecTimerId = setTimeout(() => { 
     await  this.props.store.fetchCurrRecommandation()
   // }, 2000);
  }


  componentWillUnmount() {
   // clearTimeout(this.fetchRecTimerId);
  }

    render(){

      
        return(
        <div className="content-container">
        <h1>Welcome to EBay!</h1>
        <Modal
        isOpen={this.props.store.isModalOpen}
        style={customStyles}
        contentLabel="Recommandations Modal"
      >
 
        <h2>Hot Recommandation!</h2>
        <div style={{marginBottom:'15px'}}>we have found a product that might interest you:</div>
        <div>{this.props.store.Recommandation && `${this.props.store.Recommandation.productName}`}</div>
        <div>{this.props.store.Recommandation && `only for: ${this.props.store.Recommandation.price}$!`}</div>

        <div style={{marginTop:'15px'}}>
          <button onClick={(e) => this.closeModal('buy')}>Buy</button>
          <button onClick={(e) => this.closeModal('ignore')}>Ignore</button>
        </div>
      </Modal>  
       </div>
    );
    }
}))
