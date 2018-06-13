import React from 'react';



class FarmInline extends React.Component {

    render() {
        const {post} = this.props;
        const {elClass} = this.props;
        const  showContent = elClass === 'card' ? 'd-block':'d-none';
        return (
            <div>
                {post !== undefined ? <div className="{elClass}">
                    <h1>Farm.. {post.title}</h1>
                    <p className={showContent}>Area.. {post.area}</p>
                </div>
                    : ""}
            </div>
        )
    }
}


export default FarmInline


