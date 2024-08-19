import React, { useState } from "react";
import { Box, Typography, Grid, Stack, Divider } from "@mui/material";


import { StyledButton } from "../ui/StyledButton";

import StyledInput from "../ui/StyledInput";
import { Controller, useForm } from "react-hook-form";

import StyledSelectAccess from "../ui/StyledselectAccess";
import StyledSwitch from "../ui/StyledSwitch";

export default function Addnewrole() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isChecked, setIsChecked] = useState(false);
  const [additionalPhones, setAdditionalPhones] = useState([]);

  const handleSwitchChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const option = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  const onSubmit = (data) => {
    console.log("Form data:", data);
  };

  const addPhoneNumber = () => {
    setAdditionalPhones([...additionalPhones, ""]);
  };
  return (
    <Box sx={{ padding: 3 }} bgcolor={"white"} borderRadius={"12px"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
        
          <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Role Name
            </Typography>
            <Controller
              name="rolename"
              control={control}
              defaultValue=""
              rules={{ required: "Name of role  is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the name of the role" {...field}/>
                  {errors.rolename && (
                    <span style={{ color: "red" }}>{errors.rolename.message}</span>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Role Description
            </Typography>
            <Controller
              name="rolename"
              control={control}
              defaultValue=""
              rules={{ required: "Description of role  is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the role description" {...field}/>
                  {errors.rolename && (
                    <span style={{ color: "red" }}>{errors.rolename.message}</span>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Select Access
            </Typography>
            <Controller
              name="rolename"
              control={control}
              defaultValue=""
              rules={{ required: "Description of role  is required" }}
              render={({ field }) => (
                <>
                  <Grid marginTop={3} marginLeft={2}><StyledSelectAccess placeholder="Enter the role description" {...field}/></Grid>
                  {errors.rolename && (
                    <span style={{ color: "red" }}>{errors.rolename.message}</span>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={6}>
            
              <Typography
                sx={{ marginBottom: 1 }}
                variant="h6"
                fontWeight={500}
                color={"#333333"}
              >
                Activate
              </Typography>
              </Grid>
              <Grid item xs={6} style={{ textAlign: 'right' }}> 
              <Controller
                name="activate"
                control={control}
                defaultValue={false}
                rules={{ required: "Activate is required" }}
                render={({ field }) => (
                  <>
                    <StyledSwitch
                      checked={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                        handleSwitchChange(e);
                      }}
                    />{" "}
                    {errors.activate && (
                      <span style={{ color: "red" }}>
                        {errors.activate.message}
                      </span>
                    )}{" "}
                  </>
                )}
              />
            
          </Grid>
          

          
         
          <Grid item xs={6}></Grid> 
          
          <Grid item xs={6}display={'flex'} justifyContent={'end'}>
            {" "}
            <Stack direction={"row"} spacing={2} >
              <StyledButton
                name="Cancel"
                variant="secondary"
                style={{ width: "auto" }}
              >
                Cancel
              </StyledButton>
              <StyledButton
                name="Save"
                variant="primary"
                type="submit"
                style={{ width: "auto" }}
              >
                Save
              </StyledButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}