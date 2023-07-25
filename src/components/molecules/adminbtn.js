import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function AdminCard({ img, title, link }) {
  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
      <CardMedia component="img" alt="..." height="140" image={img} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <h2>{title}</h2>
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={link} className="link-admin">
          Details...
        </Link>
      </CardActions>
    </Card>
  );
}
