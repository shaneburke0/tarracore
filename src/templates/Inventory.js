import React from "react"
import AddInventory from "../components/formComponents/AddInventory"
import ViewInventory from "./ViewInventory"

class Inventory extends React.Component {
  state = {
    viewState: "view",
  }
  toggleViewState(viewState) {
    this.setState(() => ({ viewState }))
  }
  render() {
    return (
      <div className="mobile:px-10 px-4 pb-10 flex justify-center main-content">
        <div className="w-fw">
          <div>
            <h3>Inventory</h3>
            <div className="flex">
              <button
                className="mr-4 cursor-pointer hover:text-secondary"
                onClick={() => this.toggleViewState("view")}
              >
                View
              </button>
              <button
                className="cursor-pointer hover:text-secondary"
                onClick={() => this.toggleViewState("add")}
              >
                Add
              </button>
            </div>
            {this.state.viewState === "view" ? (
              <ViewInventory />
            ) : (
              <AddInventory />
            )}
            <button
              onClick={this.props.signOut}
              className="bg-secondary hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Inventory
