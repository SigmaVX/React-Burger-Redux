import React, {Component} from "react";
import Modal from "../../components/UI/Modal/Modal";

// This creates a global way to grab and display errors
const ErrorHander = (WrappedContent, axios) =>{
    return class extends Component{

        state = {
            globalErrors: null
        };

        componentWillMount(){
            // Interceptors Are Used To Grab & Reset Errors
            // Firebase errors show in error.message property
            // res=>res Simply returns the res so res can proceed
            this.resInterceptor = axios.interceptors.response.use(res => res, error=>{
                this.setState({globalErrors: error});
            })
            this.reqInterceptor = axios.interceptors.request.use(req=>{
                this.setState({globalErrors: null});
                return req;
            })
        }

        componentWillUnmount(){
            // Unmounts interceptors each time to stop duplicates
            // This helps prevent memory leaks
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        clearErrors = () =>{
            this.setState({globalErrors:null});
        }

        // Conditional For Modal Only Renders If State Has A Message
        // Would Generate An React Issue If Not Since There Are No Errors To Display
        // And Our Modal Is Technically Loaded But Offscreen
        render(){
            return(
                <React.Fragment>
                    <Modal 
                        style={{textAlign: "center", color: "red"}}
                        showModal={this.state.globalErrors} 
                        closeModal={this.clearErrors}
                    >
                        {this.state.globalErrors ? this.state.globalErrors.message : null}
                    </Modal>
                    <WrappedContent {...this.props}/>
                </React.Fragment>

            );
        }
    }
}

export default ErrorHander;