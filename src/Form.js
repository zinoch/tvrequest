import React from "react";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";

const Form = (props) => {
  const {
    register,
    formState: { errors },
    trigger,
    handleSubmit
  } = useForm({
    mode: "onBlur"
  });

  //const [data, setData] = useState("");

  const { actions, state } = useStateMachine({ updateAction });

  const onSubmit = (data) => {
    actions.updateAction(data);
    props.history.push("./review");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ fontSize: 14, lineHeight: 1.3, marginBottom: 0 }}>
        <br />
        <div class="p">Requester Info</div>
        <input
          {...register("requester", { required: true })}
          defaultValue={state.data.requester}
          placeholder="Name"
        />
        {errors.name && <p>This field is Required</p>}
        <input
          {...register("team", { required: true })}
          defaultValue={state.data.team}
          placeholder="Team"
        />
        {errors.team && <p>This field is Required</p>}
        <input
          {...register("email", { required: true })}
          defaultValue={state.data.email}
          placeholder="LGE Email"
        />
        {errors.email && <p>This field is Required</p>}
        <textarea
          {...register("address", { required: true })}
          defaultValue={state.data.address}
          placeholder="Address"
        />
        {errors.address && <p>This field is Required</p>}

        <br />
        <div class="p">Requesting Sample Info</div>
        <select
          {...register("maker", { required: true })}
          defaultValue={state.data.maker}
        >
          <option value="" disabled selected>
            Select Manufacturer
          </option>
          <option value="Samsung">Samsung</option>
          <option value="Sony">Sony</option>
          <option value="Vizio">Vizio</option>
          <option value="Hisense">Hisense</option>
          <option value="TCL">TCL</option>
          <option value="Other">Other</option>
        </select>
        {errors.maker && <p>This field is Required</p>}
        <input
          {...register("model", { required: true })}
          defaultValue={state.data.model}
          placeholder="TV Model"
        />
        {errors.model && <p>This field is Required</p>}
        <select
          {...register("number", { required: true })}
          defaultValue={state.data.number}
        >
          <option value="" disabled selected>
            Select Number of Samples
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        {errors.maker && <p>This field is Required</p>}

        <br />
        <div class="p">Requesting Reason</div>
        <textarea
          {...register("reason", { required: true })}
          defaultValue={state.data.reason}
          placeholder="Reason for Requesting"
        />
        {errors.reason && <p>This field is Required</p>}

        <br />
        <input
          type="submit"
          value="Approval Request"
          onClick={() => {
            trigger();
          }}
        />
      </div>
    </form>
  );
};

export default withRouter(Form);
