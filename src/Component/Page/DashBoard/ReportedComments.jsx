import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const ReportedComments = () => {
  const queryClient = useQueryClient();

  // ✅ Fetch reported comments
  const { data: reports = [], isLoading, error } = useQuery({
    queryKey: ["reported-comments"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/reports-all");
      return res.data;
    },
  });

  // ✅ Delete comment mutation
  const deleteMutation = useMutation({
    mutationFn: async (commentId) => {
      await axios.delete(`http://localhost:5000/comments/${commentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reported-comments"]);
      Swal.fire("Deleted!", "Comment has been deleted.", "success");
    },
  });

  // ✅ Warn user mutation (example: update or email logic)
  const warnUser = (email) => {
    Swal.fire("User Warned", `Warning sent to ${email}`, "info");
    // You can hit a backend route here to flag/send warning
  };

  if (isLoading) return <p>Loading reports...</p>;
  if (error) return <p className="text-red-500">Error loading reports.</p>;

  if (reports.length === 0) {
    return <p className="text-center mt-10 text-gray-500">No reported comments found.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-semibold mb-6">Reported Comments</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border">
          <thead className="bg-blue-100">
            <tr>
              <th className="border px-4 py-2">Comment</th>
              <th className="border px-4 py-2">Feedback</th>
              <th className="border px-4 py-2">User</th>
              <th className="border px-4 py-2">Post ID</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report._id}>
                <td className="border px-4 py-2 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                  {report.commentText}
                </td>
                <td className="border px-4 py-2">{report.feedback}</td>
                <td className="border px-4 py-2">{report.userEmail}</td>
                <td className="border px-4 py-2 text-sm text-gray-500">{report.postId}</td>
                <td className="border px-4 py-2 flex flex-col md:flex-row gap-2">
                  <button
                    onClick={() => deleteMutation.mutate(report.commentId)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete Comment
                  </button>
                  <button
                    onClick={() => warnUser(report.userEmail)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Warn User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportedComments;
