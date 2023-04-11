import React from "react";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
//import { Checkbox } from "@material-ui/core";
import updateAction from "./updateAction";

const Review = (props) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    //   control,
    trigger,
    handleSubmit
  } = useForm({
    mode: "onChange"
  });
  //const [data, setData] = useState("");

  const { actions, state } = useStateMachine({ updateAction });

  const onSubit = (data) => {
    actions.updateAction(data);
    props.history.push("./result");
  };

  //const confirmCost = (data) => {};

  var setcost =
    parseFloat(watch("price") * state.data.number) +
    parseFloat(watch("extrafees"));
  if (isNaN(setcost)) {
    setcost = "";
  }
  var setcostdisp =
    state.data.number +
    " TV Set + Extra Fees: USD " +
    Number(setcost).toFixed(2);

  var totalcost = Number(
    parseFloat(watch("setcost")) +
      parseFloat(watch("shippingcost")) +
      parseFloat(watch("cratecost")) +
      parseFloat(watch("extracharge"))
  ).toFixed(2);
  if (isNaN(totalcost)) {
    totalcost = "";
  }
  var totalcostdisp = "Total Cost Sum: USD " + Number(totalcost).toFixed(2);
  var markupdisp = "7% Mark Up"; // + totalcost * 1.07;

  return (
    <form onSubmit={handleSubmit(onSubit)}>
      <div style={{ fontSize: 14, lineHeight: 1.3, marginBottom: 0 }}>
        <br />
        <div className="p">Approver</div>
        <input
          {...register("approver", { required: true })}
          defaultValue={state.data.approver}
          placeholder="Name"
        />
        {errors.approver && <p>This field is Required</p>}

        <br />
        <div class="p">Purchasing Info</div>
        <select
          {...register("store", { required: true })}
          defaultValue={state.data.store}
        >
          <option value="" disabled selected>
            Select Purchasing Store
          </option>
          <option value="BestBuy">Best Buy</option>
          <option value="Amazon">Amazon</option>
          <option value="Other">Other</option>
        </select>
        {errors.store && <p>This field is Required</p>}

        <input
          type="number"
          step="0.01"
          {...register("price", { required: true, valueAsNumber: true })}
          defaultValue={state.data.price}
          placeholder="Model Price After Tax (USD)"
        />
        {errors.price && <p>This field is Required</p>}

        <input
          type="number"
          step="0.01"
          {...register("extrafees", { required: true, valueAsNumber: true })}
          defaultValue={state.data.extrafees}
          placeholder="Extra Fees (USD)"
        />
        {errors.extrafees && <p>This field is Required</p>}

        <br />
        <button
          className="confirm"
          type="button"
          onClick={() => setValue("setcost", Number(setcost).toFixed(2))}
        >
          {setcostdisp}
        </button>
        <br />
        <input
          type="number"
          step="0.01"
          {...register("setcost", { required: true, valueAsNumber: true })}
          defaultValue={state.data.setcost}
          placeholder="Total Purchasing Cost (USD)"
        />
        {errors.setcost && <p>This field is Required</p>}

        <br />
        <div className="p">Shiping Info</div>

        <select
          {...register("courier", { required: true })}
          defaultValue={state.data.courier}
        >
          <option value="" disabled selected>
            Courier Name
          </option>
          <option value="UPS">UPS</option>
          <option value="DHL">DHL</option>
          <option value="Other">Other</option>
        </select>
        {errors.courier && <p>This field is Required</p>}

        <input
          {...register("tracking", { required: true })}
          defaultValue={state.data.tracking}
          placeholder="Courier Tracking Number"
        />
        {errors.tracking && <p>This field is Required</p>}

        <input
          {...register("waybill", { required: true })}
          defaultValue={state.data.waybill}
          placeholder="Waybill"
        />
        {errors.waybill && <p>This field is Required</p>}

        <br />
        <input
          type="number"
          step="0.01"
          {...register("shippingcost", { required: true, valueAsNumber: true })}
          defaultValue={state.data.shippingcost}
          placeholder="Shipping Cost (USD)"
        />
        {errors.shippingcost && <p>This field is Required</p>}

        <input
          type="number"
          step="0.01"
          {...register("cratecost", { required: true, valueAsNumber: true })}
          defaultValue={state.data.cratecost}
          placeholder="Total Wooden Crate Cost (USD)"
        />
        {errors.cratecost && <p>This field is Required</p>}

        <br />
        <div className="p">Charge to HQ Purchaser</div>

        <input
          type="number"
          step="0.01"
          {...register("extracharge", { required: true, valueAsNumber: true })}
          defaultValue={state.data.extracharge}
          placeholder="Extra Charge (USD)"
        />
        {errors.price && <p>This field is Required</p>}

        <br />

        <div className="row">
          <button
            class="confirm"
            type="button"
            onClick={() => setValue("totalcost", Number(totalcost).toFixed(2))}
          >
            {totalcostdisp}
          </button>
          {"\u00A0"}

          <button
            className="confirm"
            type="button"
            onClick={() =>
              setValue("totalcost", Number(totalcost * 1.07).toFixed(2))
            }
          >
            {markupdisp}
          </button>
        </div>
        <br />

        <input
          type="number"
          step="0.01"
          {...register("totalcost", { required: true, valueAsNumber: true })}
          defaultValue={state.data.totalcost}
          placeholder="Total Charge to Requester (USD)"
        />
        {errors.totalcost && <p>This field is Required</p>}

        <br />
        <div className="p">Note</div>
        <textarea
          {...register("note", { required: true })}
          defaultValue={state.data.reason}
          placeholder="Note"
        />

        <br />
        <input
          type="submit"
          value="Approve"
          onClick={() => {
            trigger();
          }}
        />
      </div>
    </form>
  );
};

export default withRouter(Review);
