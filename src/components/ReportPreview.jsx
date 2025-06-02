import {
  Typography,
  Dialog,
  DialogContent,
  Stack,
  DialogTitle,
  Box,
  Divider,
  Grid,
  Avatar,
} from "@mui/material";
import { StyledButton } from "../ui/StyledButton";
import { ReactComponent as CloseIcon } from "../assets/icons/CloseIcon.svg";
import { useProductsStore } from "../store/productStore";
import { useApprovalStore } from "../store/approval-store";
import company from "../assets/images/companylogo.png";
import { useMemberStore } from "../store/member-store";
import image from "../assets/images/Group.png";
import QRProductCard from "./QRProductCard";
import moment from "moment";
import { useReportStore } from "../store/reportStore";
import { useState } from "react";

const ReportPreview = ({ open, onClose, onChange, data }) => {
  const { patchProducts } = useProductsStore();
  const { patchApprovals } = useApprovalStore();
  const [submit, setSubmit] = useState(false);
  const [approve, setApprove] = useState(false);
  const { reportChat } = useReportStore();
  const [chat, setChat] = useState(false);
  const [report, setReport] = useState(false);
  const [requirement, setRequirement] = useState(false);
  const { suspend } = useMemberStore();
  const handleSubmit = async () => {
    setSubmit(true);
    try {
      const updateData = { status: "reported" };
      await patchProducts(data?.reportedElement?._id, updateData);
      onChange();
      onClose();
    } catch (error) {
      console.error(error.message);
    } finally {
      setSubmit(false);
    }
  };
  const handleReportChat = async () => {
    setChat(true);
    try {
      await reportChat(data?.reportedElement?._id);
      onChange();
      onClose();
    } catch (error) {
      console.error(error.message);
    } finally {
      setChat(false);
    }
  };
  const handleApproveProduct = async () => {
    setApprove(true);
    try {
      const updateData = { status: "accepted" };
      await patchProducts(data?.reportedElement?._id, updateData);
      onChange();
      onClose();
    } catch (error) {
      console.error(error.message);
    } finally {
      setApprove(false);
    }
  };
  const handleApproveRequirement = async () => {
    setRequirement(true);
    try {
      const updateData = { status: "approved" };
      await patchApprovals(data?.reportedElement?._id, updateData);
      onChange();
      onClose();
    } catch (error) {
      console.error(error.message);
    } finally {
      setRequirement(false);
    }
  };
  const handleRequirementSubmit = async () => {
    setReport(true);
    try {
      const updateData = { status: "reported" };
      await patchApprovals(data?.reportedElement?._id, updateData);
      onChange();
      onClose();
    } catch (error) {
      console.error(error.message);
    } finally {
      setReport(false);
    }
  };
  const handleSuspend = async () => {
    try {
      await suspend(data?.reportedElement?._id);
      onChange();
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleClear = (event) => {
    event.preventDefault();
    onClose();
  };
  const SampleProduct = {
    image: data?.reportedElement?.image,
    name: data?.reportedElement?.name,
    price: data?.reportedElement?.price,
    offer_price: data?.reportedElement?.offer_price,
    moq: data?.reportedElement?.units,
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { borderRadius: "12px", minWidth: 700 },
      }}
    >
      <DialogTitle sx={{ height: "auto", padding: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>Report Details</Typography>
          <Typography
            onClick={(event) => handleClear(event)}
            color="#E71D36"
            style={{ cursor: "pointer" }}
          >
            <CloseIcon />
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ padding: 3 }}>
        <Stack spacing={3}>
          <Stack spacing={2}>
            <Typography variant="h6" color={"#333333"} fontWeight={600}>
              Report Type: {data?.reportType}
            </Typography>{" "}
            {data?.reportedElement !== null && (
              <>
                <Typography variant="h6" color={"#333333"} fontWeight={600}>
                  Reported Content
                </Typography>

                <Box
                  display={"flex"}
                  justifyContent="center"
                  alignItems={"center"}
                  bgcolor={"#f2f2f2"}
                  padding={"16px"}
                  borderRadius={"10px"}
                >
                  {data?.reportType === "user" && (
                    <Stack
                      spacing={2}
                      bgcolor={"white"}
                      borderRadius={"10px"}
                      padding={"10px"}
                      width={"185px"}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <img
                        src={data?.reportedElement?.profile_picture || image}
                        alt="profile"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                      <Typography
                        variant="h4"
                        fontWeight={600}
                        color={"#2C2829"}
                      >
                        {data?.reportedElement?.name}
                      </Typography>
                      <Stack
                        direction={"row"}
                        spacing={2}
                        width={"100%"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <img
                          src={data?.reportedElement?.company_logo || company}
                          alt="profile"
                          style={{
                            width: "26px",
                            height: "26px",
                            borderRadius: "50%",
                          }}
                        />
                        <Stack justifyContent={"start"} width={"100%"}>
                          <Typography
                            fontWeight={600}
                            textTransform={"capitalize"}
                          >
                            {data?.reportedElement?.designation}
                          </Typography>
                          <Typography>
                            {data?.reportedElement?.company_name}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  )}
                  {data?.reportType === "product" && (
                    <Stack
                      spacing={2}
                      bgcolor={"white"}
                      borderRadius={"10px"}
                      padding={"10px"}
                      width={"185px"}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <QRProductCard product={SampleProduct} isMobile />
                    </Stack>
                  )}
                  {data?.reportType === "requirement" && (
                    <Stack
                      spacing={2}
                      bgcolor={"white"}
                      borderRadius={"10px"}
                      padding={"10px"}
                      width={"185px"}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <img
                        src={data?.reportedElement?.image || image}
                        alt="profile"
                        style={{
                          width: "165px",
                          height: "85px",
                          objectFit: "contain",
                        }}
                      />
                      <Typography mt={2}>
                        {data?.reportedElement?.content}
                      </Typography>
                    </Stack>
                  )}
                  {data?.reportType === "chat" && (
                    <Stack
                      spacing={2}
                      bgcolor={"white"}
                      borderRadius={"10px"}
                      padding={"10px"}
                      width={"185px"}
                      display={"flex"}
                      justifyContent={"flex-start"}
                    >
                      <Typography mt={2}>
                        {data?.reportedElement?.content}
                      </Typography>
                      <Typography mt={2} textAlign="end">
                        {moment(data?.reportedElement?.timestamp).format(
                          "HH:mm"
                        )}
                      </Typography>
                    </Stack>
                  )}
                </Box>
              </>
            )}
          </Stack>

          <Box>
            <Grid container spacing={2} alignItems="center">
              <Grid item md={6}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography sx={{ width: "60%", textAlign: "left" }}>
                    Reported By:
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "40%", textAlign: "left" }}
                  >
                    {data?.reportBy?.name}
                  </Typography>
                </Stack>
                {data?.reportType === "user" && (
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center" // Centers the text vertically within each Stack
                    mb={2}
                  >
                    <Typography sx={{ width: "60%", textAlign: "left" }}>
                      Offender:
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ width: "40%", textAlign: "left" }}
                    >
                      {data?.reportedElement?.name}
                    </Typography>
                  </Stack>
                )}
                {data?.reportType === "product" ||
                  (data?.reportType === "requirement" && (
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={2}
                    >
                      <Typography sx={{ width: "60%", textAlign: "left" }}>
                        Posted By
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ width: "40%", textAlign: "left" }}
                      >
                        {data?.reportedElement?.name}
                      </Typography>
                    </Stack>
                  ))}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center" // Centers the text vertically within each Stack
                  mb={2}
                >
                  <Typography sx={{ width: "60%", textAlign: "left" }}>
                    Report Reason :
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "40%", textAlign: "left" }}
                  >
                    {data?.content}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item md={6}>
                {data?.reportType === "requirement" && (
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="start"
                    mb={2}
                  >
                    <Typography sx={{ width: "60%", textAlign: "left" }}>
                      Requirement time/ date:
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ width: "40%", textAlign: "left" }}
                    >
                      {moment(data?.createdAt).format("DD-MM-YYYY HH:mm")}
                    </Typography>
                  </Stack>
                )}
                {(data?.reportType === "user" ||
                  data?.reportType === "requirement" ||
                  data?.reportType === "chat") && (
                  <>
                    {" "}
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="start"
                      mb={2}
                    >
                      <Typography sx={{ width: "60%", textAlign: "left" }}>
                        Report time/ date:
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ width: "40%", textAlign: "left" }}
                      >
                        {moment(data?.createdAt).format("DD-MM-YYYY HH:mm")}
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={2}
                    >
                      <Typography sx={{ width: "60%", textAlign: "left" }}>
                        Offence time/ date:
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ width: "40%", textAlign: "left" }}
                      >
                        {moment(data?.reportedElement?.createdAt).format(
                          "DD-MM-YYYY HH:mm"
                        )}
                      </Typography>
                    </Stack>
                  </>
                )}
                {data?.reportType === "product" && (
                  <>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={2}
                    >
                      <Typography sx={{ width: "60%", textAlign: "left" }}>
                        Purchased Quantity
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ width: "40%", textAlign: "left" }}
                      ></Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={2}
                    >
                      <Typography sx={{ width: "60%", textAlign: "left" }}>
                        Order time/ date:
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ width: "40%", textAlign: "left" }}
                      ></Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="start"
                      mb={2}
                    >
                      <Typography sx={{ width: "60%", textAlign: "left" }}>
                        Report time/ date:
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ width: "40%", textAlign: "left" }}
                      ></Typography>
                    </Stack>
                  </>
                )}
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </DialogContent>
      {data?.reportType === "user" && (
        <Stack direction={"row"} spacing={2} padding={2} justifyContent={"end"}>
          {data?.reportedElement?.status !== "suspended" && (
            <>
              {" "}
              <StyledButton
                variant="secondary"
                name={"Cancel"}
                onClick={handleClear}
              />
              <StyledButton
                variant="primary"
                name={"Suspend User"}
                onClick={handleSuspend}
              />
            </>
          )}
        </Stack>
      )}
      {data?.reportType === "chat" && (
        <Stack direction={"row"} spacing={2} padding={2} justifyContent={"end"}>
          {data?.reportedElement !== null && (
            <>
              {" "}
              <StyledButton
                variant="secondary"
                name={"Cancel"}
                disabled={chat}
                onClick={handleClear}
              />{" "}
              <StyledButton
                variant="primary"
                name={chat ? "Reporting" : "Report Chat"}
                disabled={chat}
                onClick={handleReportChat}
              />
            </>
          )}
        </Stack>
      )}{" "}
      {data?.reportType === "product" && (
        <Stack direction={"row"} spacing={2} padding={2} justifyContent={"end"}>
          {data?.reportedElement?.status === "reported" ? (
            <StyledButton
              variant="primary"
              name={approve ? "Reporting" : "RePublish"}
              disabled={approve}
              onClick={handleApproveProduct}
            />
          ) : (
            <>
              {" "}
              <StyledButton
                variant="secondary"
                name={"Cancel"}
                disabled={submit}
                onClick={handleClear}
              />{" "}
              <StyledButton
                variant="primary"
                disabled={submit}
                name={submit ? "Reporting" : "Report Product"}
                onClick={handleSubmit}
              />
            </>
          )}
        </Stack>
      )}{" "}
      {data?.reportType === "requirement" && (
        <Stack direction={"row"} spacing={2} padding={2} justifyContent={"end"}>
          {data?.reportedElement?.status === "reported" ? (
            <StyledButton
              variant="primary"
              name={requirement ? "Reporting" : "RePublish"}
              disabled={requirement}
              onClick={handleApproveRequirement}
            />
          ) : (
            <>
              {" "}
              <StyledButton
                variant="secondary"
                name={"Cancel"}
                disabled={report}
                onClick={handleClear}
              />{" "}
              <StyledButton
                variant="primary"
                name={report ? "Reporting" : "Report Requirement"}
                disabled={report}
                onClick={handleRequirementSubmit}
              />
            </>
          )}
        </Stack>
      )}
    </Dialog>
  );
};

export default ReportPreview;
