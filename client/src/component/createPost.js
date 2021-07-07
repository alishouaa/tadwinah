import React from 'react';
import axios from 'axios';

 class CreatePost extends React.Component{
 
     constructor(props){
         super(props);
         if(!localStorage.getItem('token')){
             this.props.history.push('/login');
         }
         this.onChangeTitle = this.onChangeTitle.bind(this);
         this.onChangeContent = this.onChangeContent.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
         this.state = {
             title: '',
             content: '',
             error: ''
         };
     }
 
     onChangeTitle(e){
         this.setState({
             title: e.target.value,
             error: ''
         });
     }
 
     onChangeContent(e){
         this.setState({
             content: e.target.value,
             error: ''
         });
     }
 
     onSubmit(e){
         e.preventDefault();
         let data = {
             title: this.state.title,
             content: this.state.content
         };
         axios.post('/api/posts', data)
         .then(res => {
             this.props.history.push('/');
         })
         .catch(err => {
             this.setState({
                 error: err.response.data.message
             });
         })
     }
 
     renderError(){
         return this.state.error ? (<blockquote>{this.state.error}</blockquote>) : "";
     }
 
     render(){
         return(
             <div className="column column-50 column-offset-25">
                 <h4>إنشاء تدوينة</h4>
                 <hr/>
                 {this.renderError()}
                 <form onSubmit={this.onSubmit}>
                     <label>العنوان</label>
                     <input type="text" value={this.state.title} onChange={this.onChangeTitle} />
                     <label>المحتوى</label>
                     <textarea value={this.state.content} onChange={this.onChangeContent}></textarea>
                     <input className="button-primary" type="submit" value="إنشاء التدوينة" />
                 </form>
             </div>
         );
     }
 }
 
 export default CreatePost;