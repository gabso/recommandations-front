import {
    decorate,
    observable,
    action,
} from "mobx"





export default class ProductStore {
    Recommandation = undefined;
    state = "pending";
    isModalOpen = false;


    fetchCurrRecommandation = async () => {

        try {
            const res = await fetch('http://localhost:5000/getCurrRecommandation');
            const resJSon = await res.json();
            this.Recommandation = resJSon;

            this.isModalOpen = true;
        } catch (error) {
            this.isModalOpen = false;
        }
    }

    setIsModalOpen = async (isOpen) => {
        this.isModalOpen = isOpen;
    }


    sendDecision = async (decisionInfo) => {

        try {
     await   fetch('http://localhost:5000/produceUserDecision', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(decisionInfo),
          })
        } catch(err){
            this.state = "error"
        }
    }
    
}

decorate(ProductStore, {
    state: observable,
    isModalOpen: observable,
    Recommandation: observable,
    sendDecision : action,
    setIsModalOpen: action
})