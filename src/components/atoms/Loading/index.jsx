import './index.css';

export function Loading() {
    return (
       <div className="spinner">
           <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
       </div>
    );
}
