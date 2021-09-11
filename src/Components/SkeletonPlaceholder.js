import {Col, Row} from "react-bootstrap";
import Skeleton from 'react-loading-skeleton';

function SkeletonPlaceholder(){
    return(
        <div className="skeleton-placeholder">
            <Row>
                <Col>
                    <div className="skeleton-photo">
                        <Skeleton />
                    </div>
                    <div className="skeleton-body">
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default SkeletonPlaceholder;