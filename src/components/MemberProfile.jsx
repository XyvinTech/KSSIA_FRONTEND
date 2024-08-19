import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import products from "../assets/json/Products";
import imag from "../assets/images/staff.png";
import UserCard from "../ui/Usercard";
import UserCard2 from "../ui/Usercard2";
import { ReactComponent as InstagramIcon } from "../assets/icons/InstagramIcon.svg";
import { ReactComponent as TwitterIcon } from "../assets/icons/TwitterIcon.svg";
import { ReactComponent as LinkedInIcon } from "../assets/icons/LinkedInIcon.svg";
import { ReactComponent as WebsiteIcon } from "../assets/icons/WebsiteIcon.svg";
import ProductCard from "./ProductCard";
import CertificateCard from "./CertificateCard";
import AwardCard from "./AwardCard";

const MemberProfile = ({data}) => {
  
  // const data = {
  //   id: "4.5",
  //   name: "Prabodhan Fitzgerald",
  //   title: "Member ID: KSSIA-GM-0934",
  //   phone: "+1234567890",
  //   email: "john.doe@example.com",
  //   address:"123,cross ,Lorel ipsumLorel ipsum,567788",
  //   img: imag,
  // };

 
  return (
    <>
      <Grid container spacing={4} padding={2}>
        <Grid item md={7}>
          <UserCard user={data} />
        </Grid>
        <Grid item md={5}>
          <UserCard2 />
        </Grid>
        <Grid item md={12}>
          <Typography variant="h5" color="#2C2829" mt={1}>
            Social Media
          </Typography>
        </Grid>{" "}
        <Grid item md={4} xs={12}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            bgcolor="white"
            borderRadius={"12px"}
            p={2}
          >
            <InstagramIcon />
            <Typography variant="h5" color="#6D6D6D" fontWeight={400} ml={1}>
              John.346.ig
            </Typography>
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            borderRadius={"12px"}
            bgcolor="white"
            p={2}
          >
            <LinkedInIcon />
            <Typography variant="h5" color="#6D6D6D" fontWeight={400} ml={1}>
              John Flitzgerald
            </Typography>
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            bgcolor="white"
            borderRadius={"12px"}
            p={2}
          >
            <TwitterIcon />
            <Typography variant="h5" color="#6D6D6D" fontWeight={400} ml={1}>
              John.346.twitter
            </Typography>
          </Box>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h5" color="#2C2829" mt={1}>
            Websites & links
          </Typography>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            bgcolor="white"
            borderRadius={"12px"}
            p={2}
          >
            <WebsiteIcon />
            <Typography variant="h5" color="#6D6D6D" fontWeight={400} ml={1}>
              Allindiaexports.com
            </Typography>
          </Box>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h5" color="#2C2829" mt={1}>
            Products
          </Typography>
        </Grid>{" "}
        {products.map((product) => (
          <Grid item md={2} xs={12} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
        <Grid item md={12}>
          <Typography variant="h5" color="#2C2829" mt={1}>
            Certificates
          </Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <CertificateCard />
        </Grid>
        <Grid item md={12}>
          <Typography variant="h5" color="#2C2829" mt={1}>
            Awards
          </Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <AwardCard />
        </Grid>
      </Grid>
    </>
  );
};

export default MemberProfile;
