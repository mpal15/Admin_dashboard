import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  WelcomePage,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { authProvider, dataProvider,liveProvider} from "./providers";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import {Home, ForgotPassword,Login } from './pages';
import Layout from "./components/layout";
import { resources } from "./config/resources";
import { CompanyList }from "./pages/company/list";
import Create from "./pages/company/create";
import EditPage from "./pages/company/edit";
import List from "./pages/tasks/list";
import TasksEditPage from "./pages/tasks/edit";
import TasksCreatePage from "./pages/tasks/create";


function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
       
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={resources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "eAbqRg-GLHJd4-7DLJqa",
                  liveMode: "auto",
                }}
              >
              <Routes>
               
                
                <Route path="/forgot-password" element= {<ForgotPassword />} />
                <Route path ="/login" element= {<Login/>}/>
             
              
                <Route
                 element={<Authenticated 
                          key="authenticated-layout"
                          fallback={<CatchAllNavigate to="/login" />}>
                     <Layout>
                    <Outlet />
                  </Layout>
                   </Authenticated>}
                >
                 <Route index element ={<Home />}/>
                 <Route path="/companies">
                  <Route index element={<CompanyList />} />
                  <Route path="new" element={<Create />} />
                  <Route path="edit/:id" element={<EditPage />}/>
                  </Route>
                  <Route path="/tasks" element={
                  <List >
                    <Outlet />
                  </List>
                }>
                  <Route path="new" element={<TasksCreatePage/>} />
                  <Route path="edit/:id" element={<TasksEditPage/>} />
                 </Route>
                </Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
 
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
