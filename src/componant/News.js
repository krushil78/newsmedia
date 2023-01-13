import React, { Component } from "react";
import NewsItems from "./NewsItems";
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";


export class news extends Component {
  static defaultProps = {
    country: 'in',
    pageSize : 8,
    category : 'general'

  }
  static propTypes = {
    country :PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

 capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    console.log("hello");
    this.state = {
      articles: [],
      loading: true
      ,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)}-Newsmedia`
  }


  async updateNews(){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a73279d250d04289ae042d31394d5e8d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });

    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
      
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {

    // all this green line is define the preveius logic of the app than we used a new logic and apply updatenews line.
   // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a73279d250d04289ae042d31394d5e8d&page=1&pageSize=${this.props.pageSize}`;
//this.setState({ loading: true });

//let data = await fetch(url);
  //  let parsedData = await data.json();
  //  console.log(parsedData);
   // this.setState({
   //   articles: parsedData.articles,
   //   totalResults: parsedData.totalResults,
   //   loading: false,
   // });
   this.updateNews();
  }
  handlePrevClick = async () => {
    //console.log("priveous");
    // this.setState({ loading: true });
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a73279d250d04289ae042d31394d5e8d&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`;
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
      // page: this.state.page - 1,
      // articles: parsedData.articles,
     //  loading: false,
    // });
    this.setState({page:this.state.page-1});
    this.updateNews();
  };
  handleNextClick = async () => {
    //console.log("Next");
   // if (
   //   !(this.state.page + 1 >
   //   Math.ceil(this.state.totalResults/this.props.pageSize))
   // ) {
   //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a73279d250d04289ae042d31394d5e8d&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
   //   this.setState({ loading: true });
    //  let data = await fetch(url);
    //  let parsedData = await data.json(); 
    //  console.log(parsedData);
    //  this.setState({
     //   page: this.state.page + 1,
   //     articles: parsedData.articles,
   //     loading: false
   //   });

  //  }
  this.setState({page:this.state.page+1})
this.updateNews();
  };
  fetchMoreData = async () => {
    this.setState({page:this.state.page+1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a73279d250d04289ae042d31394d5e8d&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,

    
    });
   
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{margin:"35px 0px"}}>Nowsmedia-Top {this.capitalizeFirstLetter(this.props.category)} headlines</h1>
       {this.state.loading && <Spinner />}
       <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                > 
      <div className = "container">

        <div className="row">
          { this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key = {element.url}>
                <NewsItems
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date ={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        
         
        </div>
        </div>
        </InfiniteScroll>
      </>
     
    );
  }
}

export default news;
