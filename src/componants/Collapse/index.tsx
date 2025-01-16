import "../../styles/css/collapse/style.css"

interface CollapseProps {
  checking: string
  money: number
}

const Collapse: React.FC<CollapseProps> = ({ checking, money }) => {
  return (
    <div className="collapse-conteneur">
      <div className="info-conteneur">
        <p className="info-numero-compte">Argent Bank Checking ({checking})</p>
        <p className="info-argent">${money}</p>
        <p>Available Balance</p>
      </div>
      <div className="button-conteneur">
        <button className="btn-history">View Transactions</button>
      </div>
    </div>
  )
}

export default Collapse
